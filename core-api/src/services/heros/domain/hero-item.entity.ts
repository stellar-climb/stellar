import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { Hero } from './hero.entity';
import type { CalendarDate } from '@common/types';
import { HeroItemLink, HeroItemLinkCtor } from './hero-item-link.entity';
import { BadRequestException } from '@nestjs/common';

export enum HeroItemType {
  SERIES = 'series',
  ARTIST = 'artist',
  ALBUM = 'album',
  LINK = 'link',
  EVENT = 'event',
}
export enum HeroItemStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  EXPIRED = 'expired',
}

export type HeroItemCtor = {
  sequence: number;
  startOn: CalendarDate;
  endOn: CalendarDate;
  type: HeroItemType;
  heroItemLink?: HeroItemLinkCtor;
};

@Entity()
export class HeroItem extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heroId: number;

  @Column()
  sequence: number;

  @Column()
  startOn: CalendarDate;

  @Column()
  endOn: CalendarDate;

  @Column({ type: 'enum', enum: HeroItemType })
  type: HeroItemType;

  @Column({ type: 'enum', enum: HeroItemStatus })
  status: HeroItemStatus;

  @ManyToOne(() => Hero, (hero) => hero.heroItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'heroId' })
  hero: Hero;

  @OneToOne(() => HeroItemLink, (heroItemLink) => heroItemLink.heroItem)
  heroItemLink?: HeroItemLink;

  private constructor(args: HeroItemCtor) {
    super();

    if (args) {
      this.sequence = args.sequence;
      this.startOn = args.startOn;
      this.endOn = args.endOn;
      this.type = args.type;

      // NOTE: 초기화
      this.status = HeroItemStatus.PENDING;
    }
  }

  static of(args: HeroItemCtor) {
    const heroItem = new HeroItem({
      sequence: args.sequence,
      startOn: args.startOn,
      endOn: args.endOn,
      type: args.type,
    });

    switch (args.type) {
      case HeroItemType.SERIES:
        if (!args.heroItemLink) {
          throw new BadRequestException(`해당 유형(${args.type})은 링크가 필요합니다.`, {
            cause: `해당 유형은 링크가 필요합니다.`,
          });
        }
        heroItem.addHeroLink(args.heroItemLink);
        break;
      default:
        throw new BadRequestException(`해당 유형(${args.type})은 현재 지원하지 않습니다.`, {
          cause: `해당 유형은 현재 지원하지 않습니다.`,
        });
    }

    return heroItem;
  }

  private addHeroLink(args: HeroItemLinkCtor) {
    this.heroItemLink = new HeroItemLink(args);
  }
}

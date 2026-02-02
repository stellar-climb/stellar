import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { Hero } from './hero.entity';
import type { CalendarDate } from '@common/types';
import { HeroItemLink, HeroItemLinkCtor } from './hero-item-link.entity';

export enum HeroItemType {
  SERIES = 'series',
  ARTIST = 'artsit',
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

  constructor(args: HeroItemCtor) {
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
}

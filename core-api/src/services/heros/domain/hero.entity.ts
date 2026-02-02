import { DddAggregate } from '@libs/ddd';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { type CalendarDate } from '@common/types';
import { HeroSeries, type HeroSeriesCtor } from './hero-series.entity';
import { HeroEvent, type HeroEventCtor } from './hero-event.entity';
import { HeroLink, type HeroLinkCtor, type HeroLinkType } from './hero-link.entity';

export enum HeroType {
  SERIES = 'series',
  EVENT = 'event',
  LINK = 'link',
}

export enum HeroStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  EXPIRED = 'expired',
}

type Ctor = {
  type: HeroType;
  backgroundImageUrl?: string;
  sequence: number;
  startOn: CalendarDate;
  endOn: CalendarDate;
  heroLink?: HeroLinkCtor;
  heroEvent?: HeroEventCtor;
  heroSeries?: HeroSeriesCtor;
};

@Entity()
export class Hero extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: HeroType })
  type: HeroType;

  @Column({ nullable: true })
  backgroundImageUrl?: string;

  @Column()
  sequence: number;

  @Column({ type: 'enum', enum: HeroStatus })
  status: HeroStatus;

  @Column()
  startOn: CalendarDate;

  @Column()
  endOn: CalendarDate;

  @OneToOne(() => HeroSeries, (heroSeries) => heroSeries.hero, { nullable: true, cascade: true })
  heroSeries?: HeroSeries;

  @OneToOne(() => HeroEvent, (heroEvent) => heroEvent.hero, { nullable: true, cascade: true })
  heroEvent?: HeroEvent;

  @OneToOne(() => HeroLink, (heroLink) => heroLink.hero, { nullable: true, cascade: true })
  heroLink?: HeroLink;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.type = args.type;
      this.sequence = args.sequence;
      this.backgroundImageUrl = args.backgroundImageUrl;
      this.startOn = args.startOn;
      this.endOn = args.endOn;

      if (args.type === HeroType.LINK && args.heroLink) {
        this.createHeroLink({ title: args.heroLink.title, type: args.heroLink.type });
      }
      if (args.type === HeroType.EVENT && args.heroEvent) {
        this.createHeroEvent({ title: args.heroEvent.title, eventId: args.heroEvent.eventId });
      }
      if (args.type === HeroType.SERIES && args.heroSeries) {
        this.createHeroSeries({
          title: args.heroSeries.title,
          characterImageUrl: args.heroSeries.characterImageUrl,
          subText: args.heroSeries.subText,
          colorText: args.heroSeries.colorText,
          bottomText: args.heroSeries.bottomText,
          seriesId: args.heroSeries.seriesId,
        });
      }

      // NOTE: 초기화
      this.status = HeroStatus.PENDING;
    }
  }

  private createHeroLink({ title, type }: HeroLinkCtor) {
    this.heroLink = new HeroLink({ title, type });
  }

  private createHeroEvent({ title, eventId }: HeroEventCtor) {
    this.heroEvent = new HeroEvent({ title, eventId });
  }

  private createHeroSeries({ title, characterImageUrl, subText, colorText, bottomText, seriesId }: HeroSeriesCtor) {
    this.heroSeries = new HeroSeries({
      title,
      characterImageUrl,
      subText,
      colorText,
      bottomText,
      seriesId,
    });
  }
}

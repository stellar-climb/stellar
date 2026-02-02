import { DddAggregate } from '@libs/ddd';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { type CalendarDate } from '../../../common/types';

export enum SeriesStatus {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
}

export enum SeriesMakingType {
  GENERAL = 'general', // 일반
  MONOPOLY = 'monopoly', // 독점
}

type Ctor = {
  thumbnailImageUrl: string;
  name: string;
  writer: string;
  illustrator: string;
  publisher: string;
  isAdultContent: boolean;
  publishOn?: CalendarDate;
  completedOn?: CalendarDate;
  description: string;
  makingType: SeriesMakingType;
};

@Entity()
export class Series extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thumbnailImageUrl: string;

  @Column()
  name: string;

  @Column()
  writer: string;

  @Column()
  illustrator: string;

  @Column()
  publisher: string;

  @Column()
  isAdultContent: boolean;

  @Column({ type: 'enum', enum: SeriesStatus })
  status: SeriesStatus;

  @Column()
  isOpen: boolean;

  @Column({ nullable: true })
  publishOn?: CalendarDate;

  @Column({ nullable: true })
  completedOn?: CalendarDate;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: SeriesMakingType })
  makingType: SeriesMakingType;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.thumbnailImageUrl = args.thumbnailImageUrl;
      this.name = args.name;
      this.writer = args.writer;
      this.illustrator = args.illustrator;
      this.publisher = args.publisher;
      this.isAdultContent = args.isAdultContent;
      this.publishOn = args.publishOn;
      this.completedOn = args.completedOn;
      this.description = args.description;
      this.makingType = args.makingType;

      // NOTE: 초기화
      this.status = SeriesStatus.PENDING;
      this.isOpen = false;
    }
  }
}

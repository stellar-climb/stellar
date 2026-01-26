import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import type { CalendarDate } from '@common/types';

export enum MusicStatus {
  PREPARE = 'PREPARE',
  PUBLISH = 'PUBLISH',
  INACTIVE = 'INACTIVE',
}

type Ctor = {
  albumId: number;
  thumbnailImageUrl: string;
  title: string;
  lyricist: string;
  songwriter: string;
  lyrics?: string;
  expectedPublishOn?: CalendarDate;
  isAdultContent: boolean;
  isMain: boolean;
};

@Entity()
@Index('idx_music_album_id', ['albumId'])
export class Music extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  albumId: number;

  @Column()
  thumbnailImageUrl: string;

  @Column()
  title: string;

  @Column()
  lyricist: string;

  @Column()
  songwriter: string;

  @Column({ type: 'enum', enum: MusicStatus })
  status: MusicStatus;

  @Column({ type: 'text', nullable: true })
  lyrics?: string;

  @Column({ nullable: true })
  expectedPublishOn?: CalendarDate;

  @Column()
  isAdultContent: boolean;

  @Column()
  isMain: boolean;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.albumId = args.albumId;
      this.thumbnailImageUrl = args.thumbnailImageUrl;
      this.title = args.title;
      this.lyricist = args.lyricist;
      this.songwriter = args.songwriter;
      this.lyrics = args.lyrics;
      this.expectedPublishOn = args.expectedPublishOn;
      this.isAdultContent = args.isAdultContent;
      this.isMain = args.isMain;

      // NOTE: 초기화
      this.status = MusicStatus.PREPARE;
    }
  }

  update(args: {
    thumbnailImageUrl?: string;
    title?: string;
    status?: MusicStatus;
    lyricist?: string;
    songwriter?: string;
    lyrics?: string;
    expectedPublishOn?: CalendarDate;
    isAdultContent?: boolean;
    isMain?: boolean;
  }) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    Object.assign(this, changedArgs);
  }
}

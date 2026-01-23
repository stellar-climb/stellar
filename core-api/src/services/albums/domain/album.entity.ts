import type { CalendarDate } from '@common/types';
import { DddAggregate } from '@libs/ddd';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type Ctor = {
  coverImageUrl: string;
  bannerImageUrl?: string;
  title: string;
  subTitle: string;
  publisher: string;
};

@Entity()
export class Album extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coverImageUrl: string;

  @Column({ nullable: true })
  bannerImageUrl?: string;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  publisher: string;

  @Column()
  isOpen: boolean;

  @Column({ nullable: true })
  publishedOn?: CalendarDate;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.coverImageUrl = args.coverImageUrl;
      this.bannerImageUrl = args.bannerImageUrl;
      this.title = args.title;
      this.subTitle = args.subTitle;
      this.publisher = args.publisher;

      // NOTE: 초기화
      this.isOpen = false;
    }
  }

  update(args: {
    coverImageUrl?: string;
    bannerImageUrl?: string;
    title?: string;
    subTitle?: string;
    publisher?: string;
  }) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    Object.assign(this, changedArgs);
  }

  changeOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}

import type { CalendarDate } from '@common/types';
import { DddAggregate } from '@libs/ddd';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumUpdatedEvent } from './events';
import { type Admin } from '@services/admins/domain/admin.entity';

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

  update(
    args: {
      coverImageUrl?: string;
      bannerImageUrl?: string;
      title?: string;
      subTitle?: string;
      publisher?: string;
    },
    admin?: Admin
  ) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    const previous = this.snapshot();
    Object.assign(this, changedArgs);

    this.publishEvent(new AlbumUpdatedEvent(this.id, previous, this, admin));
  }

  changeOpen(isOpen: boolean, admin?: Admin) {
    this.isOpen = isOpen;

    this.publishEvent(new AlbumUpdatedEvent(this.id, { isOpen: !isOpen }, { isOpen: this.isOpen }, admin));
  }

  private snapshot() {
    return {
      id: this.id,
      coverImageUrl: this.coverImageUrl,
      bannerImageUrl: this.bannerImageUrl,
      title: this.title,
      subTitle: this.subTitle,
      publisher: this.publisher,
      isOpen: this.isOpen,
      publishedOn: this.publishedOn,
    };
  }
}

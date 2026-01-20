import { DddAggregate } from '@libs/ddd';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { CalendarDate } from '@common/types';

export enum ArtistStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

type Ctor = {
  profileImageUrl: string;
  name: string;
  nickname: string;
  status: ArtistStatus;
  expectedActivatedOn: CalendarDate;
  phoneNumber?: string;
  email?: string;
};

@Entity()
export class Artist extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileImageUrl: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column({ type: 'enum', enum: ArtistStatus })
  status: ArtistStatus;

  @Column()
  expectedActivatedOn: CalendarDate;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  email?: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.profileImageUrl = args.profileImageUrl;
      this.name = args.name;
      this.nickname = args.nickname;
      this.status = args.status;
      this.expectedActivatedOn = args.expectedActivatedOn;
      this.phoneNumber = args.phoneNumber;
      this.email = args.email;
    }
  }
}

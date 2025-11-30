import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { generateId, today } from '@libs/utils';
import { type CalendarDate } from '@common/types';

type Ctor = {
  profileImageUrl?: string;
  name: string;
  email: string;
  googleSub: string;
};

export enum AdminStatus {
  ACTIVE = 'active',
  EXITED = 'exited',
}

@Entity()
export class Admin extends DddAggregate {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  googleSub: string;

  @Column({ type: 'enum', enum: AdminStatus })
  status: AdminStatus;

  @Column({ nullable: true })
  exitOn?: CalendarDate;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.id = generateId();
      this.name = args.name;
      this.profileImageUrl = args.profileImageUrl;
      this.email = args.email;
      this.googleSub = args.googleSub;

      // NOTE: 기본 상태 초기화
      this.status = AdminStatus.ACTIVE;
    }
  }

  exit() {
    this.exitOn = today();
  }
}

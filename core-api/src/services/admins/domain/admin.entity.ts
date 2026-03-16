import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { generateId, today } from '@libs/utils';
import { type CalendarDate } from '@common/types';
import { hashSync } from 'bcrypt';

type Ctor = {
  profileImageUrl?: string;
  name: string;
  email: string;
  password: string;
  googleSub?: string;
  roleType: AdminRoleType;
  status: AdminStatus;
};

export enum AdminStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  EXITED = 'exited',
}

export enum AdminRoleType {
  SUPER = 'super',
  PARTNER = 'partner',
}

@Entity()
export class Admin extends DddAggregate {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  googleSub?: string;

  @Column({ type: 'enum', enum: AdminStatus })
  status: AdminStatus;

  @Column({ type: 'enum', enum: AdminRoleType })
  roleType: AdminRoleType;

  @Column({ nullable: true })
  exitOn?: CalendarDate;

  private constructor(args: Ctor) {
    super();

    if (args) {
      this.id = generateId();
      this.name = args.name;
      this.profileImageUrl = args.profileImageUrl;
      this.password = args.password;
      this.email = args.email;
      this.googleSub = args.googleSub;
      this.roleType = args.roleType;
      this.status = args.status;
    }
  }

  static of(args: { profileImageUrl?: string; name: string; password: string; email: string; googleSub?: string }) {
    return new Admin({
      profileImageUrl: args.profileImageUrl,
      name: args.name,
      email: args.email,
      password: hashSync(args.password, 10),
      googleSub: args.googleSub,
      roleType: args.email === 'jeangho293@gmail.com' ? AdminRoleType.SUPER : AdminRoleType.PARTNER,
      status: args.email === 'jeangho293@gmail.com' ? AdminStatus.ACTIVE : AdminStatus.PENDING,
    });
  }

  exit() {
    this.exitOn = today();
  }
}

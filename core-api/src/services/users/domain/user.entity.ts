import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import crypto from 'crypto';

type Ctor = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  socialType: string;
  socialId: string;
};

@Entity()
@Unique('idx_user_social', ['socialType', 'socialId'])
export class User extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  socialType!: string;

  @Column()
  socialId!: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.name = args.name;
      this.nickname = args.nickname;
      this.email = args.email;
      this.password = this.hashPassword(args.password);
      this.socialType = args.socialType;
      this.socialId = args.socialId;
    }
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

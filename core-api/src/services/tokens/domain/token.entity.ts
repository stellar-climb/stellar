import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Ctor = {
  userId: number;
  accessToken: string;
  refreshToken: string;
};

@Entity()
@Index('idx_user_id', ['userId'])
export class Token extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  accessToken!: string;

  @Column()
  refreshToken!: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.userId = args.userId;
      this.accessToken = args.accessToken;
      this.refreshToken = args.refreshToken;
    }
  }
}

import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Ctor = {
  userId: string;
  name: string;
};

@Entity()
@Index('idx_user_id', ['userId'])
@Unique('uk_user_id_name', ['userId', 'name'])
export class Role extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.userId = args.userId;
      this.name = args.name;
    }
  }
}

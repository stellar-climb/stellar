import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

@Entity()
export class User extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;
}

import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

@Entity()
export class Token extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;
}

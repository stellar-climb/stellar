import { DddAggregate } from '@libs/ddd';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

type Ctor = {
  name: string;
  description: string;
};

@Entity()
export class RolePolicy extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.name = args.name;
      this.description = args.description;
    }
  }
}

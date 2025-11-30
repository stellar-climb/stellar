import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { generateId } from '@libs/utils';

type Ctor = {
  name: string;
  email: string;
  googleCI: string;
};

@Entity()
export class Admin extends DddAggregate {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  googleCI: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.id = generateId();
      this.name = args.name;
      this.email = args.email;
      this.googleCI = args.googleCI;
    }
  }
}

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

  @Column()
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

  update(args: { name?: string; description?: string }) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    Object.assign(this, changedArgs);
  }
}

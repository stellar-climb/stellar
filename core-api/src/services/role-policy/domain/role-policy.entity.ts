import { DddAggregate } from '@libs/ddd';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RolePolicyUpdatedEvent } from './events';
import { type Admin } from '@services/admins/domain/admin.entity';

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

  update(args: { name?: string; description?: string }, admin?: Admin) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    const previous = { ...this };
    Object.assign(this, changedArgs);

    this.publishEvent(new RolePolicyUpdatedEvent(this.id, previous, this, admin));
  }
}

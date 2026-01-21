import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Ctor = {
  category: string;
  name: string;
};

@Entity()
export class Tag extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  name: string;

  constructor(args: Ctor) {
    super();
    if (args) {
      this.category = args.category;
      this.name = args.name;
    }
  }

  update(args: { category?: string; name?: string }) {
    const changedArgs = this.stripUnchanged(args);

    if (!changedArgs) {
      return;
    }

    Object.assign(this, changedArgs);
  }
}

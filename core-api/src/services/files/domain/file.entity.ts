import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Ctor = {
  filename: string;
  publicUrl: string;
  type: string;
  isCommitted: boolean;
};

@Entity()
export class File extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  publicUrl: string;

  @Column()
  type: string;

  @Column()
  isCommitted: boolean;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.filename = args.filename;
      this.publicUrl = args.publicUrl;
      this.type = args.type;
      this.isCommitted = args.isCommitted;
    }
  }
}

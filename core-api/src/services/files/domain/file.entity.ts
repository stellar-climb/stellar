import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

type Ctor = {
  filename: string;
  publicUrl: string;
  contentType: string;
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
  contentType: string;

  @Column()
  isCommitted: boolean;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.filename = args.filename;
      this.publicUrl = args.publicUrl;
      this.contentType = args.contentType;

      // NOTE: 초기화
      this.isCommitted = false;
    }
  }
}

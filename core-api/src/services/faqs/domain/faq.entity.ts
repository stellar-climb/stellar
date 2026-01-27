import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

export enum FaqType {
  ACCOUNT = 'account',
}

export enum FaqStatus {
  PENDING = 'pending',
  OPENED = 'opened',
  INACTIVE = 'inactive',
}

type Ctor = {
  type: FaqType;
  question: string;
  answer: string;
};

@Entity()
export class Faq extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: FaqType })
  type: FaqType;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'enum', enum: FaqStatus })
  status: FaqStatus;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.type = args.type;
      this.question = args.question;
      this.answer = args.answer;

      // NOTE: 초기화
      this.status = FaqStatus.PENDING;
    }
  }
}

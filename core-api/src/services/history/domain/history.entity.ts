import { Entity, Index } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

type Ctor = {
  adminId?: number;
  adminName?: string;
  entity: string;
  entityId: string;
  log: Record<string, any>;
};

@Entity()
@Index('idx_entity_entity_id', ['entity', 'entityId'])
export class History extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  entityId: string;

  @Column({ nullable: true })
  adminId?: number;

  @Column()
  adminName: string;

  @Column({ type: 'json' })
  log: Record<string, any>;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.entity = args.entity;
      this.entityId = args.entityId;
      this.adminId = args.adminId;
      this.adminName = args.adminName ?? 'system';
      this.log = args.log;
    }
  }
}

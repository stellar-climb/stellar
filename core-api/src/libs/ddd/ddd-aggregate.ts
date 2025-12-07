import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { DddEvent } from './ddd-event';
import { plainToInstance } from 'class-transformer';

export class DddAggregate {
  private readonly events: DddEvent[] = [];

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @Column({ select: false })
  private createdBy!: string;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  @Column({ select: false })
  private updatedBy!: string;

  @DeleteDateColumn()
  private readonly deletedAt!: Date;

  setTxId(txId: string) {
    if (!this.createdAt) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }

  publishEvent(event: DddEvent) {
    this.events.push(event);
  }

  getPublishedEvents() {
    return [...this.events];
  }

  toInstance<T>(args: new (...args: any[]) => T) {
    return plainToInstance(args, this);
  }
}

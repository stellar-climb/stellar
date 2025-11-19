import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DddAggregate {
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
}

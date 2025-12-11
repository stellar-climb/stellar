import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { DddEvent } from './ddd-event';
import { plainToInstance } from 'class-transformer';
import { stripUndefined } from '../utils';
import { isEqual } from 'lodash';

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

  /**
   * @param changed 변경된 obj
   * @returns 현재 객체의 changed를 비교해서 변경된 부분만 반환한다. 바뀐게 없다면 undefined 를 반환한다.
   */
  protected stripUnchanged(changed: { [key: string]: any }) {
    const compared = Object.keys(changed).reduce((acc: { [key: string]: any }, prop) => {
      const originValue = this[prop as keyof typeof this];
      const changedValue = changed[prop];
      acc[prop] = !isEqual(originValue, changedValue) ? changedValue : undefined;
      return acc;
    }, {});

    return stripUndefined(compared);
  }
}

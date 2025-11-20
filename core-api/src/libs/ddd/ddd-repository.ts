import { EntityManager, ObjectType, DataSource } from 'typeorm';
import { DddAggregate } from './ddd-aggregate';
import { InjectDataSource } from '@nestjs/typeorm';
import { Context, ContextKey } from '@common/context';
import { DddEvent } from './ddd-event';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly context: Context
  ) {}

  abstract entityClass: ObjectType<T>;

  get entityManager(): EntityManager {
    // NOTE: Context의 entityManager를 꺼내오는 경우는, @Transaction()으로 인한 Transaction entityManager를 가져오기 위함.
    return this.context.get<EntityManager>(ContextKey.ENTITY_MANAGER) || this.datasource.manager;
  }

  createQueryBuilder(alias: string) {
    return this.entityManager.createQueryBuilder<T>(this.entityClass, alias);
  }

  async save(entities: T[]) {
    await this.saveEntities(entities);
    await this.saveEvents(entities.flatMap((entity) => entity.getPublishedEvents()));
  }

  async softRemove(entities: T[]) {
    await this.entityManager.softRemove(entities);
  }

  private async saveEntities(entities: T[]) {
    const txId = this.context.get<string>(ContextKey.TXID);
    entities.forEach((entity) => entity.setTxId(txId));
    await this.entityManager.save(entities);
  }

  private async saveEvents(events: DddEvent[]) {
    const txId = this.context.get<string>(ContextKey.TXID);
    const dddEvents = events.map((event) => DddEvent.fromEvent(event));
    dddEvents.forEach((event) => event.setTxId(txId));

    await this.entityManager.save(dddEvents);

    // NOTE: DDD 이벤트를 저장한 후, DDD 이벤트를 컨텍스트에 저장하여 이벤트 발행 시 사용.
    this.context.set(ContextKey.DDD_EVENTS, dddEvents);
  }
}

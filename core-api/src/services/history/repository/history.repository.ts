import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { History } from '../domain/history.entity';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class HistoryRepository extends DddRepository<History> {
  entityClass = History;

  async find(
    conditions: { id?: number; entity?: string; entityId?: string; adminId?: string; adminName?: string },
    options: TypeormRelationOptions<History>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        entity: conditions.entity,
        entityId: conditions.entityId,
        adminId: conditions.adminId,
        adminName: conditions.adminName,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; entity?: string; entityId?: string; adminId?: string; adminName?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        entity: conditions.entity,
        entityId: conditions.entityId,
        adminId: conditions.adminId,
        adminName: conditions.adminName,
      }),
    });
  }
}

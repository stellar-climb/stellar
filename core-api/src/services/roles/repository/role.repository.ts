import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Role } from '../domain/role.entity';
import { convertOptions, PaginationOptions, stripUndefined } from '@libs/utils';

@Injectable()
export class RoleRepository extends DddRepository<Role> {
  entityClass = Role;

  async find(condition: { id?: number; userId?: string; name?: string }, options?: PaginationOptions) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: condition.id,
        userId: condition.userId,
        name: condition.name,
      }),
      ...convertOptions(options),
    });
  }

  async count(condition: { id?: number; userId?: string; name?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: condition.id,
        userId: condition.userId,
        name: condition.name,
      }),
    });
  }
}

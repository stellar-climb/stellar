import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { RolePolicy } from '../domain/role-policy.entity';
import { checkLikeValue, convertOptions, type TypeormRelationOptions, stripUndefined } from '@libs/utils';

@Injectable()
export class RolePolicyRepository extends DddRepository<RolePolicy> {
  entityClass = RolePolicy;

  async find(
    condition: { search?: string; searchValue?: string; id?: number; name?: string },
    options?: TypeormRelationOptions<RolePolicy>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: condition.id,
        name: condition.name,
        ...checkLikeValue({ search: condition.search, searchValue: condition.searchValue }),
      }),
      ...convertOptions(options),
    });
  }

  async count(condition: { search?: string; searchValue?: string; id?: number; name?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: condition.id,
        name: condition.name,
        ...checkLikeValue({ search: condition.search, searchValue: condition.searchValue }),
      }),
    });
  }
}

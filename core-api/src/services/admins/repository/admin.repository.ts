import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Admin } from '../domain/admin.entity';
import { checkLikeValue, convertOptions, type PaginationOptions, stripUndefined } from '@libs/utils';

@Injectable()
export class AdminRepository extends DddRepository<Admin> {
  entityClass = Admin;

  async find(
    conditions: { id?: string; email?: string; googleSub?: string; search?: string; searchValue?: string },
    options?: PaginationOptions
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        email: conditions.email,
        googleSub: conditions.googleSub,
        ...checkLikeValue({ searchValue: conditions.searchValue, searchKey: conditions.search }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: string; email?: string; googleSub?: string; search?: string; searchValue?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        email: conditions.email,
        googleSub: conditions.googleSub,
        ...checkLikeValue({ searchValue: conditions.searchValue, searchKey: conditions.search }),
      }),
    });
  }
}

import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Tag } from '../domain/tag.entity';
import { checkInValue, checkLikeValue, convertOptions, type TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class TagRepository extends DddRepository<Tag> {
  entityClass = Tag;

  async find(
    conditions: { ids?: number[]; category?: string; name?: string; search?: string; searchValue?: string },
    options?: TypeormRelationOptions<Tag>
  ): Promise<Tag[]> {
    return this.entityManager.find(this.entityClass, {
      where: {
        id: checkInValue(conditions.ids),
        category: conditions.category,
        name: conditions.name,
        ...checkLikeValue({ search: conditions.search, searchValue: conditions.searchValue }),
      },
      ...convertOptions(options),
    });
  }

  async count(conditions: { ids?: number[]; category?: string; name?: string; search?: string; searchValue?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: {
        id: checkInValue(conditions.ids),
        category: conditions.category,
        name: conditions.name,
        ...checkLikeValue({ search: conditions.search, searchValue: conditions.searchValue }),
      },
    });
  }
}

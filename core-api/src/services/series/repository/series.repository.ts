import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Series } from '../domain/series.entity';
import { checkLikeValue, convertOptions, stripUndefined, type TypeormRelationOptions } from '@libs/utils';
import { type SeriesMakingType } from '../domain/series.entity';

@Injectable()
export class SeriesRepository extends DddRepository<Series> {
  entityClass = Series;

  async find(
    conditions: { id?: number; search?: string; searchValue?: string; name?: string; makingType?: SeriesMakingType },
    options?: TypeormRelationOptions<Series>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        name: conditions.name,
        makingType: conditions.makingType,
        ...checkLikeValue({
          search: conditions.search,
          searchValue: conditions.searchValue,
        }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: {
    id?: number;
    search?: string;
    searchValue?: string;
    name?: string;
    makingType?: SeriesMakingType;
  }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        name: conditions.name,
        makingType: conditions.makingType,
        ...checkLikeValue({
          search: conditions.search,
          searchValue: conditions.searchValue,
        }),
      }),
    });
  }
}

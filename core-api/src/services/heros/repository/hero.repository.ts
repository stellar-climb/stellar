import { DddRepository } from '@libs/ddd';
import { Hero, type HeroStatus, type HeroType } from '../domain/hero.entity';
import { Injectable } from '@nestjs/common';
import { convertOptions, stripUndefined, type TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class HeroRepository extends DddRepository<Hero> {
  entityClass = Hero;

  async find(
    conditions: { id?: number; type?: HeroType; status?: HeroStatus },
    options?: TypeormRelationOptions<Hero>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        type: conditions.type,
        status: conditions.status,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; type?: HeroType; status?: HeroStatus }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        type: conditions.type,
        status: conditions.status,
      }),
    });
  }
}

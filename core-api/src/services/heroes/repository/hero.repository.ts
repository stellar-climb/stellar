import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Hero, HeroType } from '../domain/hero.entity';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class HeroRepository extends DddRepository<Hero> {
  entityClass = Hero;

  async find(conditions: { id?: number; type?: HeroType }, options?: TypeormRelationOptions<Hero>) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        type: conditions.type,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; type?: HeroType }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        type: conditions.type,
      }),
    });
  }
}

import { DddRepository } from '@libs/ddd';
import { Hero } from '../domain/hero.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HeroRepository extends DddRepository<Hero> {
  entityClass = Hero;
}

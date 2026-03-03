import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Hero, HeroType } from '../domain/hero.entity';
import { HeroRepository } from '../repository/hero.repository';
import { PaginationOptions } from '@libs/utils';
import { Transactional } from '@libs/decorators';

@Injectable()
export class AdminHeroService extends DddService {
  constructor(private readonly heroRepository: HeroRepository) {
    super();
  }

  @Transactional()
  async create({ type }: { type: HeroType }) {
    const [existedHero] = await this.heroRepository.find({ type });

    if (existedHero) {
      throw new BadRequestException(`${type} 타입의 히어로는 이미 존재합니다.`, {
        cause: `${type} 타입의 히어로는 이미 존재합니다.`,
      });
    }

    const hero = new Hero({ type });

    await this.heroRepository.save([hero]);
  }

  async list({ type }: { type?: HeroType }, options?: PaginationOptions) {
    const [heroes, total] = await Promise.all([
      this.heroRepository.find({ type }, { options }),
      this.heroRepository.count({ type }),
    ]);

    return { heroes, total };
  }

  async retrieve({ id }: { id: number }) {
    const [hero] = await this.heroRepository.find({ id });

    if (!hero) {
      throw new NotFoundException('히어로를 찾을 수 없습니다.');
    }

    return { hero };
  }
}

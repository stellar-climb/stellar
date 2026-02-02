import { DddService } from '@libs/ddd';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HeroRepository } from '../repository/hero.repository';
import { Transactional } from '@libs/decorators';
import { HeroType, Hero } from '../domain/hero.entity';
import { type CalendarDate } from '@common/types';
import type { HeroLinkCtor } from '../domain/hero-link.entity';
import type { HeroSeriesCtor } from '../domain/hero-series.entity';
import type { HeroEventCtor } from '../domain/hero-event.entity';

@Injectable()
export class AdminHeroService extends DddService {
  constructor(private readonly heroRepository: HeroRepository) {
    super();
  }

  @Transactional()
  async create({
    type,
    backgroundImageUrl,
    sequence,
    startOn,
    endOn,
    heroLink,
    heroSeries,
    heroEvent,
  }: {
    type: HeroType;
    backgroundImageUrl?: string;
    sequence: number;
    startOn: CalendarDate;
    endOn: CalendarDate;
    heroLink?: HeroLinkCtor;
    heroEvent?: HeroEventCtor;
    heroSeries?: HeroSeriesCtor;
  }) {
    if (startOn >= endOn) {
      throw new BadRequestException('시작일이 종료일보다 클 수 없습니다.', {
        cause: '시작일이 종료일보다 클 수 없습니다.',
      });
    }

    const hero = new Hero({
      type,
      backgroundImageUrl,
      sequence,
      startOn,
      endOn,
      heroLink,
      heroSeries,
      heroEvent,
    });

    await this.heroRepository.save([hero]);
  }
}

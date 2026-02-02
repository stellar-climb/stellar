import { DddService } from '@libs/ddd';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HeroRepository } from '../repository/hero.repository';
import { Transactional } from '@libs/decorators';
import { HeroType, Hero, HeroStatus } from '../domain/hero.entity';
import { type CalendarDate } from '@common/types';
import type { HeroLinkCtor } from '../domain/hero-link.entity';
import type { HeroSeriesCtor } from '../domain/hero-series.entity';
import type { HeroEventCtor } from '../domain/hero-event.entity';
import { type PaginationOptions } from '@libs/utils';

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

  async list({ type, status }: { type?: HeroType; status?: HeroStatus }, options: PaginationOptions) {
    const [heros, count] = await Promise.all([
      this.heroRepository.find(
        { type, status },
        { options, relations: { heroEvent: true, heroLink: true, heroSeries: true } }
      ),
      this.heroRepository.count({ type, status }),
    ]);

    return { items: heros, count };
  }

  async retrieve({ id }: { id: number }) {
    const [hero] = await this.heroRepository.find(
      { id },
      { relations: { heroEvent: true, heroLink: true, heroSeries: true } }
    );

    if (!hero) {
      throw new NotFoundException('히어로를 찾을 수 없습니다.', {
        cause: '히어로를 찾을 수 없습니다.',
      });
    }

    return hero;
  }

  async remove({ id }: { id: number }) {
    const [hero] = await this.heroRepository.find({ id });

    if (!hero) {
      throw new NotFoundException('히어로를 찾을 수 없습니다.', {
        cause: '히어로를 찾을 수 없습니다.',
      });
    }

    await this.heroRepository.softRemove([hero]);
  }
}

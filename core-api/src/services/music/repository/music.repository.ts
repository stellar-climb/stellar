import { DddRepository } from '@libs/ddd';
import { checkRangeValue, convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { Music } from '../domain/music.entity';
import { Injectable } from '@nestjs/common';
import type { CalendarDate } from '@common/types';

@Injectable()
export class MusicRepository extends DddRepository<Music> {
  entityClass = Music;

  async find(
    conditions: {
      id?: number;
      albumId?: number;
      title?: string;
      minExpectedPublishOn?: CalendarDate;
      maxExpectedPublishOn?: CalendarDate;
    },
    options?: TypeormRelationOptions<Music>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        albumId: conditions.albumId,
        title: conditions.title,
        expectedPublishOn: checkRangeValue(conditions.minExpectedPublishOn, conditions.maxExpectedPublishOn),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: {
    id?: number;
    albumId?: number;
    title?: string;
    minExpectedPublishOn?: CalendarDate;
    maxExpectedPublishOn?: CalendarDate;
  }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        albumId: conditions.albumId,
        title: conditions.title,
        expectedPublishOn: checkRangeValue(conditions.minExpectedPublishOn, conditions.maxExpectedPublishOn),
      }),
    });
  }
}

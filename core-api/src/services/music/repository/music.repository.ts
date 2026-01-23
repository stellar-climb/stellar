import { DddRepository } from '@libs/ddd';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';
import { Music } from '../domain/music.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicRepository extends DddRepository<Music> {
  entityClass = Music;

  async find(conditions: { id?: number; albumId?: number }, options?: TypeormRelationOptions<Music>) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        albumId: conditions.albumId,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; albumId?: number }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        albumId: conditions.albumId,
      }),
    });
  }
}

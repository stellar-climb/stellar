import { DddRepository } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { Album } from '../domain/album.entity';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class AlbumRepository extends DddRepository<Album> {
  entityClass = Album;

  async find(
    conditions: { id?: number; isOpen?: boolean; title?: string; publisher?: string },
    options?: TypeormRelationOptions<Album>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        isOpen: conditions.isOpen,
        title: conditions.title,
        publisher: conditions.publisher,
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; isOpen?: boolean; title?: string; publisher?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        isOpen: conditions.isOpen,
        title: conditions.title,
        publisher: conditions.publisher,
      }),
    });
  }
}

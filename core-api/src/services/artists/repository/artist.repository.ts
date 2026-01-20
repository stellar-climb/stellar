import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Artist, ArtistStatus } from '../domain/artist.entity';
import { checkLikeValue, convertOptions, type TypeormRelationOptions, stripUndefined } from '@libs/utils';

@Injectable()
export class ArtistRepository extends DddRepository<Artist> {
  entityClass = Artist;

  async find(
    conditions: { id?: number; status?: ArtistStatus; search?: string; searchValue?: string },
    options?: TypeormRelationOptions<Artist>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        status: conditions.status,
        ...checkLikeValue({ search: conditions.search, searchValue: conditions.searchValue }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: { id?: number; status?: ArtistStatus; search?: string; searchValue?: string }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        status: conditions.status,
        ...checkLikeValue({ search: conditions.search, searchValue: conditions.searchValue }),
      }),
    });
  }
}

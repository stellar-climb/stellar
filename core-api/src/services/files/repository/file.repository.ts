import { Injectable } from '@nestjs/common';
import { DddRepository } from '../../../libs/ddd';
import { File } from '../domain/file.entity';
import { stripUndefined } from '../../../libs/utils';

@Injectable()
export class FileRepository extends DddRepository<File> {
  entityClass = File;

  async find(conditions: { id?: number }) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
      }),
    });
  }

  async count(conditions: { id?: number }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
      }),
    });
  }
}

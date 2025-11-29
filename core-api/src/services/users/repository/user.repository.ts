import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/user.entity';
import { convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class UserRepository extends DddRepository<User> {
  entityClass = User;

  async find(condition: { id?: number; email?: string }, options?: TypeormRelationOptions<User>) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: condition.id,
        email: condition.email,
      }),
      ...convertOptions(options),
    });
  }

  async count(condition: { id?: number; email?: string }, options?: TypeormRelationOptions<User>) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: condition.id,
        email: condition.email,
      }),
      ...convertOptions(options),
    });
  }
}

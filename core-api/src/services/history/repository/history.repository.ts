import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { History } from '../domain/history.entity';

@Injectable()
export class HistoryRepository extends DddRepository<History> {
  entityClass = History;
}

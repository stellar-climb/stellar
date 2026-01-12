import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { HistoryRepository } from '../repository/history.repository';

@Injectable()
export class AdminHistoryService extends DddService {
  constructor(private readonly historyRepository: HistoryRepository) {
    super();
  }
}

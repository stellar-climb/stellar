import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { HistoryRepository } from '../repository/history.repository';
import { TypeormRelationOptions } from '@libs/utils';
import { History } from '../domain/history.entity';

@Injectable()
export class AdminHistoryService extends DddService {
  constructor(private readonly historyRepository: HistoryRepository) {
    super();
  }

  async list(options: TypeormRelationOptions<History>) {
    const [histories, total] = await Promise.all([
      this.historyRepository.find({}, options),
      this.historyRepository.count({}),
    ]);

    return { items: histories, total };
  }
}

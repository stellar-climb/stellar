import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { HistoryRepository } from '../repository/history.repository';
import { EventHandler, Transactional } from '@libs/decorators';
import { QueueName } from '@common/event-box/queues';
import { RolePolicyUpdatedEvent } from '@services/role-policy/domain/events';

@Injectable()
export class HistoryService extends DddService {
  constructor(private readonly historyRepository: HistoryRepository) {
    super();
  }

  @Transactional()
  @EventHandler(RolePolicyUpdatedEvent, QueueName.HISTORY, {
    description: '역할 정책이 변경되면 변경 이력을 저장합니다.',
  })
  async handleRolePolicyUpdatedEvent() {}
}

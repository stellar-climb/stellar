import { CommonConsumer, QueueName } from '@common/event-box';
import { Processor } from '@nestjs/bullmq';
import { HistoryService } from './history.service';
import { RolePolicyUpdatedEvent } from '@services/role-policy/domain/events';
import { AlbumUpdatedEvent } from '@services/albums/domain/events';

@Processor(QueueName.HISTORY)
export class HistoryConsumer extends CommonConsumer {
  constructor(private readonly historyService: HistoryService) {
    super();

    this.methodHandlerMap.set(
      RolePolicyUpdatedEvent.name,
      this.historyService.handleRolePolicyUpdatedEvent.bind(this.historyService)
    );

    this.methodHandlerMap.set(
      AlbumUpdatedEvent.name,
      this.historyService.handleAlbumUpdatedEvent.bind(this.historyService)
    );
  }
}

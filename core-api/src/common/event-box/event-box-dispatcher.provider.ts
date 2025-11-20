import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DddEventStatus, DddEvent } from '@libs/ddd';
import { Logger } from '@nestjs/common';
import { CommonDispatcher } from './common-dispatcher';

@Injectable()
export class EventBoxDispatcherProvider extends CommonDispatcher {
  private readonly logger = new Logger(EventBoxDispatcherProvider.name);

  @OnEvent('ddd-event.created')
  async handleEventBoxCreated(event: DddEvent) {
    // step 1. 해당 이벤트 박스가 처리되지 않은 이벤트인지 확인. -> 중복 처리를 방지하기 위함.
    const dddEvent = await this.dddEventRepository.findOne({
      where: { id: event.id, eventStatus: DddEventStatus.PENDING },
    });

    if (!dddEvent) {
      return;
    }

    // step 2. 해당 이벤트 박스가 처리해야하는 큐를 찾음.
    if (dddEvent) {
      const targetQueues = this.eventMap.get(dddEvent.eventType);

      // NOTE: 여기서 추가적으로 처리해줘야하는 부분이 있나?
      if (!targetQueues || targetQueues.length === 0) {
        return;
      }

      // step 3. 해당 이벤트 박스를 처리해야하는 큐에 이벤트 박스를 추가.
      try {
        await Promise.all(
          targetQueues.map((queueName) => {
            const queue = this.getQueue(queueName);
            return queue.add(dddEvent.eventType, dddEvent, {
              removeOnComplete: true,
              removeOnFail: {
                // NOTE: 7일 이후 자동 삭제
                age: 7 * 24 * 3600,
              },
              attempts: 3,
              backoff: {
                type: 'exponential',
                delay: 1000,
              },
            });
          })
        );

        // step 4. 해당 이벤트 박스를 처리 완료 상태로 업데이트.
        await this.dddEventRepository.update(dddEvent.id, { eventStatus: DddEventStatus.PROCESSED });
      } catch (err) {
        this.logger.error(`QueueName 추가 및 Common Dispatcher 설정 필요.\n${err.stack}`);
      }
    }
  }
}

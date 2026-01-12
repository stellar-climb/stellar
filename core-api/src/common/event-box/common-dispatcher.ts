import { DddEvent } from '@libs/ddd';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from 'bullmq';
import { QueueName } from './queues';
import { InjectQueue } from '@nestjs/bullmq';

export class CommonDispatcher {
  private static readonly _eventMap = new Map<string, string[]>();

  protected readonly eventMap = new Map<string, string[]>(CommonDispatcher._eventMap);

  constructor(
    @InjectRepository(DddEvent) private readonly privateDddEventRepository: Repository<DddEvent>,
    @InjectQueue(QueueName.HISTORY) private readonly historyQueue: Queue
  ) {}

  static pushEventMap(event: DddEvent, queueName: string) {
    const eventName = event.constructor.name;

    if (!CommonDispatcher._eventMap.has(eventName)) {
      CommonDispatcher._eventMap.set(eventName, [queueName]);
    } else {
      const existingQueues = CommonDispatcher._eventMap.get(eventName);
      if (existingQueues && !existingQueues.includes(queueName)) {
        existingQueues.push(queueName);
      }
    }
  }

  get dddEventRepository(): Repository<DddEvent> {
    return this.privateDddEventRepository;
  }

  protected getQueue(name: string): Queue {
    const queues: Record<string, Queue> = {
      [QueueName.HISTORY]: this.historyQueue,
    };

    return queues[name];
  }
}

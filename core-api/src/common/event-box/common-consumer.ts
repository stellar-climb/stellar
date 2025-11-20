import { ContextKey } from '@common/context';
// import { SlackService } from '@common/slack';
import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { asyncLocalStorage } from '@common/context';

export abstract class CommonConsumer extends WorkerHost {
  private readonly logger = new Logger(CommonConsumer.name);

  // @Inject()
  // private readonly slackService!: SlackService;

  protected readonly methodHandlerMap = new Map<string, (data: any) => Promise<void>>();

  async process(job: Job) {
    const {
      name,
      data: { payload },
    } = job;

    const handler = this.getHandler(name);
    const store = this.getContext(job);

    await asyncLocalStorage.run(store, async () => {
      await handler(JSON.parse(payload));
    });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<{ txId: string; eventType: string }>, error: Error) {
    console.log(error);
    this.logger.error(`[txId: ${job.data.txId}] ${job.data.eventType} is not success.`, error.stack);
    if (process.env.NODE_ENV !== 'local') {
      // this.slackService.send(`[txId: ${job.data.txId}] ${job.data.eventType} is not success.\n${error.stack}`);
      console.log(`[txId: ${job.data.txId}] ${job.data.eventType} is not success.\n${error.stack}`);
    }
  }

  private getHandler(name: string) {
    const handler = this.methodHandlerMap.get(name);

    if (!handler) {
      throw new Error(`Handler for job ${name} not found`);
    }

    return handler;
  }

  private getContext(job: Job<{ txId: string }>) {
    const store = new Map();
    store.set(ContextKey.TXID, job.data.txId);

    return store;
  }
}

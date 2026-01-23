import { Logger, Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsService } from '@configs';
import entities from './entities';
import { DataSource } from 'typeorm';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueName } from '@common/event-box';
import queues from '@common/event-box/queues';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        ...configsService.mysql,
        entities,
        synchronize: configsService.isProduction() ? false : true,
        timezone: 'Z',
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        connection: {
          host: configsService.redis.host,
          port: configsService.redis.port,
        },
        prefix: 'stellar',
      }),
    }),
    BullModule.registerQueue(...queues),
  ],
})
export class DatabasesModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabasesModule.name);

  constructor(
    private readonly datasource: DataSource,
    @InjectQueue(QueueName.HEALTH) private readonly healthQueue: Queue
  ) {}

  onModuleInit() {
    this.checkMysqlConnection();
    this.checkRedisConnection();
  }

  async onModuleDestroy() {
    if (this.datasource.isInitialized) {
      await this.datasource.destroy().then(() => this.logger.log('Mysql Database is successfully destroyed.'));
    }
  }

  private checkMysqlConnection() {
    if (this.datasource.isInitialized) {
      this.logger.log('Mysql Database is initialized.');
    } else {
      throw new Error('Mysql Database is not initialized.');
    }
  }

  private async checkRedisConnection() {
    const status = (await this.healthQueue.client).status;

    if (status === 'ready') {
      this.logger.log('Redis connection is ready.');
    } else {
      throw new Error('Redis connection is not ready.');
    }
  }
}

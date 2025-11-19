import { Global, Logger, Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsService } from '@configs';
import entities from './entities';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        ...configsService.mysql,
        entities,
        synchronize: configsService.isProduction() ? false : true,
      }),
    }),
  ],
})
export class DatabasesModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabasesModule.name);

  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('MySQL database successfully connected. 🚀');
    } else {
      this.logger.error('MySQL database connection failed!');
    }
  }

  async onModuleDestroy() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.logger.log('MySQL database successfully disconnected. 🚀');
    }
  }
}

import { Module } from '@nestjs/common';
import { HistoryRepository } from './repository/history.repository';
import { AdminHistoryService } from './applications/admin-history.service';
import { AdminHistoryController } from './controllers/admin-history.controller';
import { HistoryConsumer } from './applications/history.consumer';
import { HistoryService } from './applications/history.service';

@Module({
  controllers: [AdminHistoryController],
  providers: [AdminHistoryService, HistoryRepository, HistoryConsumer, HistoryService],
  exports: [HistoryRepository],
})
export class AdminHistoryModule {}

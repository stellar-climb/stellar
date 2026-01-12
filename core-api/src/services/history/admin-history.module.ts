import { Module } from '@nestjs/common';
import { HistoryRepository } from './repository/history.repository';
import { AdminHistoryService } from './applications/admin-history.service';
import { AdminHistoryController } from './controllers/admin-history.controller';

@Module({
  controllers: [AdminHistoryController],
  providers: [AdminHistoryService, HistoryRepository],
  exports: [HistoryRepository],
})
export class AdminHistoryModule {}

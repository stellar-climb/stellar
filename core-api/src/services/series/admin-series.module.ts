import { Module } from '@nestjs/common';
import { AdminSeriesController } from './controllers/admin-series.controller';
import { AdminSeriesService } from './applications/admin-series.service';
import { SeriesRepository } from './repository/series.repository';

@Module({
  controllers: [AdminSeriesController],
  providers: [AdminSeriesService, SeriesRepository],
  exports: [AdminSeriesService, SeriesRepository],
})
export class AdminSeriesModule {}

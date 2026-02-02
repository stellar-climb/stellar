import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { SeriesRepository } from '../repository/series.repository';
import { PaginationOptions } from '@libs/utils';
import { SeriesMakingType } from '../domain/series.entity';

@Injectable()
export class AdminSeriesService extends DddService {
  constructor(private readonly seriesRepository: SeriesRepository) {
    super();
  }

  async list(
    { search, searchValue, makingType }: { search?: string; searchValue?: string; makingType?: SeriesMakingType },
    options?: PaginationOptions
  ) {
    const [seriesList, total] = await Promise.all([
      this.seriesRepository.find({ search, searchValue, makingType }, { options }),
      this.seriesRepository.count({ search, searchValue, makingType }),
    ]);

    return { items: seriesList, total };
  }
}

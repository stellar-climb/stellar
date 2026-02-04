import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { SeriesRepository } from '../repository/series.repository';
import { PaginationOptions } from '@libs/utils';
import { Series, SeriesMakingType } from '../domain/series.entity';
import { Transactional } from '@libs/decorators';

@Injectable()
export class AdminSeriesService extends DddService {
  constructor(private readonly seriesRepository: SeriesRepository) {
    super();
  }

  @Transactional()
  async create({
    coverImageUrl,
    name,
    writer,
    illustrator,
    publisher,
    isAdultContent,
    description,
    makingType,
  }: {
    coverImageUrl: string;
    name: string;
    writer: string;
    illustrator: string;
    publisher: string;
    isAdultContent: boolean;
    description: string;
    makingType: SeriesMakingType;
  }) {
    const [duplicatedSeries] = await this.seriesRepository.find({ name });

    if (duplicatedSeries) {
      throw new BadRequestException('이미 존재하는 시리즈명입니다.', { cause: '이미 존재하는 시리즈명입니다.' });
    }

    const series = new Series({
      coverImageUrl,
      name,
      writer,
      illustrator,
      publisher,
      isAdultContent,
      description,
      makingType,
    });

    await this.seriesRepository.save([series]);
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

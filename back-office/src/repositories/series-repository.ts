import type { SeriesMakingType, SeriesModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const seriesRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: SeriesModel[]; total: number }>('/series', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

  async create(data: {
    coverImageUrl: string;
    name: string;
    writer: string;
    illustrator: string;
    publisher: string;
    isAdultContent: boolean;
    makingType: SeriesMakingType;
  }) {
    return httpClient.post<SeriesModel>('/series', data);
  },
};

queryKeyMap.set(seriesRepository.list, ['Series']);
queryKeyMap.set(seriesRepository.create, ['Series']);

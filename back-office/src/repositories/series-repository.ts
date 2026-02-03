import type { SeriesModel } from '@models';
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
};

queryKeyMap.set(seriesRepository.list, ['Series']);

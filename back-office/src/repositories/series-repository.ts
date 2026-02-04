import type { SeriesMakingType, SeriesModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const seriesRepository = {
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

  async retrieve({ id }: { id: number }) {
    return httpClient.get<SeriesModel>(`/series/${id}`);
  },

  async changeOpen({ id, isOpen }: { id: number; isOpen: boolean }) {
    return httpClient.put(`/series/${id}/open`, { isOpen });
  },
};

queryKeyMap.set(seriesRepository.create, ['Series']);
queryKeyMap.set(seriesRepository.list, ['Series']);
queryKeyMap.set(seriesRepository.retrieve, ['Series']);
queryKeyMap.set(seriesRepository.changeOpen, ['Series']);

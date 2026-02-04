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

  async update({
    id,
    coverImageUrl,
    name,
    writer,
    illustrator,
    publisher,
    isAdultContent,
    makingType,
  }: {
    id: number;
    coverImageUrl?: string;
    name?: string;
    writer?: string;
    illustrator?: string;
    publisher?: string;
    isAdultContent?: boolean;
    makingType?: SeriesMakingType;
  }) {
    return httpClient.put<SeriesModel>(`/series/${id}`, {
      coverImageUrl,
      name,
      writer,
      illustrator,
      publisher,
      isAdultContent,
      makingType,
    });
  },

  async changeOpen({ id, isOpen }: { id: number; isOpen: boolean }) {
    return httpClient.put(`/series/${id}/open`, { isOpen });
  },

  async remove({ id }: { id: number }) {
    return httpClient.delete(`/series/${id}`);
  },
};

queryKeyMap.set(seriesRepository.create, ['Series']);
queryKeyMap.set(seriesRepository.list, ['Series']);
queryKeyMap.set(seriesRepository.retrieve, ['Series']);
queryKeyMap.set(seriesRepository.update, ['Series']);
queryKeyMap.set(seriesRepository.changeOpen, ['Series']);
queryKeyMap.set(seriesRepository.remove, ['Series']);

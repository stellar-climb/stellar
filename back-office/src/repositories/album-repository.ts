import type { AlbumModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const albumRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string; isOpen?: boolean };
  }) {
    return httpClient.get<{ items: AlbumModel[]; total: number }>('/albums', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

  async create({
    coverImageUrl,
    bannerImageUrl,
    title,
    subTitle,
    publisher,
  }: {
    coverImageUrl: string;
    bannerImageUrl?: string;
    title: string;
    subTitle: string;
    publisher: string;
  }) {
    return httpClient.post<Promise<void>>('/albums', { title, subTitle, publisher, coverImageUrl, bannerImageUrl });
  },
};

queryKeyMap.set(albumRepository.list, ['Album']);
queryKeyMap.set(albumRepository.create, ['Album']);

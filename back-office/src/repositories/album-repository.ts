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
};

queryKeyMap.set(albumRepository.list, ['Album']);

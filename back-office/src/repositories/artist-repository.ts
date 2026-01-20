import type { ArtistModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const artistRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: ArtistModel[]; total: number }>('/artists', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },
};

queryKeyMap.set(artistRepository.list, ['Artist']);

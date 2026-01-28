import type { ContentPriceModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const contentPriceRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: ContentPriceModel[]; total: number }>('/policies/content-prices', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },
};

queryKeyMap.set(contentPriceRepository.list, ['ContentPrice']);

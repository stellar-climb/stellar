import type { AdminModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const adminRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: AdminModel[]; total: number }>('/members', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },
};

queryKeyMap.set(adminRepository.list, ['Admin']);

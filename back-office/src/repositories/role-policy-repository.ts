import { httpClient, queryKeyMap } from '@libs';
import type { RolePolicyModel } from '@models';

export const rolePolicyRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page?: number;
    limit?: number;
    filter?: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: RolePolicyModel[]; total: number }>('/policies/roles', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },
};

queryKeyMap.set(rolePolicyRepository.list, ['role-policies']);

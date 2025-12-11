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

  async create({ name, description }: { name: string; description: string }) {
    return httpClient.post<RolePolicyModel>('/policies/roles', { name, description });
  },

  async remove({ id }: { id: string }) {
    return httpClient.delete<void>(`/policies/roles/${id}`);
  },
};

queryKeyMap.set(rolePolicyRepository.list, ['role-policies']);
queryKeyMap.set(rolePolicyRepository.create, ['role-policies']);
queryKeyMap.set(rolePolicyRepository.remove, ['role-policies']);

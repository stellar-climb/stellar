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
    return httpClient.post<void>('/policies/roles', { name, description });
  },

  async update({ id, name, description }: { id: number; name?: string; description?: string }) {
    return httpClient.put<void>(`/policies/roles/${id}`, { name, description });
  },

  async remove({ id }: { id: number }) {
    return httpClient.delete<void>(`/policies/roles/${id}`);
  },
};

queryKeyMap.set(rolePolicyRepository.list, ['role-policies']);
queryKeyMap.set(rolePolicyRepository.create, ['role-policies']);
queryKeyMap.set(rolePolicyRepository.update, ['role-policies']);
queryKeyMap.set(rolePolicyRepository.remove, ['role-policies']);

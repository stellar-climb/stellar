import { httpClient } from '@libs';
import type { RolePolicyModel, RolePolicyListFilter, RolePolicyCreate } from '../models';

export const rolePolicyRepository = {
  async list({ page, limit, filter }: RolePolicyListFilter) {
    return httpClient.get<{ items: RolePolicyModel[]; total: number }>('/policies/roles', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

  async create({ name, description }: RolePolicyCreate) {
    return httpClient.post<void>('/policies/roles', { name, description });
  },

  async update({ id, name, description }: { id: number; name?: string; description?: string }) {
    return httpClient.put<void>(`/policies/roles/${id}`, { name, description });
  },

  async remove({ id }: { id: number }) {
    return httpClient.delete<void>(`/policies/roles/${id}`);
  },
};

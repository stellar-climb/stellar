import { httpClient, queryKeyMap } from '@libs';
import type { TagModel } from '@models';

export const tagRepository = {
  async create({ category, name }: { category: string; name: string }) {
    return httpClient.post<TagModel>('/tags', { category, name });
  },

  async list({
    page,
    limit,
    filter,
  }: {
    page?: number;
    limit?: number;
    filter?: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: TagModel[]; total: number }>('/tags', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

  async update({ id, category, name }: { id: string; category?: string; name?: string }) {
    return httpClient.put<TagModel>(`/tags/${id}`, { category, name });
  },

  async remove({ id }: { id: number }) {
    return httpClient.delete(`/tags/${id}`);
  },
};

queryKeyMap.set(tagRepository.create, ['Tag']);
queryKeyMap.set(tagRepository.list, ['Tag']);
queryKeyMap.set(tagRepository.update, ['Tag']);
queryKeyMap.set(tagRepository.remove, ['Tag']);

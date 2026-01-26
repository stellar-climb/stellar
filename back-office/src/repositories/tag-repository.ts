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
};

queryKeyMap.set(tagRepository.create, ['Tag']);
queryKeyMap.set(tagRepository.list, ['Tag']);

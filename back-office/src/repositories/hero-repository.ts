import type { HeroModel, HeroType } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const heroRepository = {
  async create({ type }: { type: HeroType }) {
    return httpClient.post<void>('/heroes', { type });
  },

  async list({ page, limit, filter }: { page: number; limit: number; filter: { type?: HeroType } }) {
    return httpClient.get<{ items: HeroModel[]; total: number }>('/heroes', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

  async retrieve({ id }: { id: number }) {
    return httpClient.get<HeroModel>(`/heroes/${id}`);
  },
};

queryKeyMap.set(heroRepository.create, ['Hero']);
queryKeyMap.set(heroRepository.list, ['Hero']);
queryKeyMap.set(heroRepository.retrieve, ['Hero']);

import type { HeroModel, HeroListFilter, HeroType } from '@features/hero/models';
import { httpClient } from '@libs';

export const heroRepository = {
  async create({ type }: { type: HeroType }) {
    return httpClient.post<void>('/heroes', { type });
  },

  async list({ page, limit, filter }: HeroListFilter) {
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

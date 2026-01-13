import type { HistoryModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const historyRepository = {
  async list() {
    return httpClient.get<{ items: HistoryModel[]; total: number }>('/histories', {});
  },
};

queryKeyMap.set(historyRepository.list, ['History']);

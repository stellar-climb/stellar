import type { Faq, FaqType } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const faqRepository = {
  async create({ type, question, answer }: { type: FaqType; question: string; answer: string }) {
    return httpClient.post<Faq>('/faqs', { type, question, answer });
  },

  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string };
  }) {
    return httpClient.get<{ items: Faq[]; total: number }>('/faqs', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

  async update({ id, type, question, answer }: { id: number; type?: FaqType; question?: string; answer?: string }) {
    return httpClient.put<Faq>(`/faqs/${id}`, { type, question, answer });
  },

  async remove({ id }: { id: number }) {
    return httpClient.delete<void>(`/faqs/${id}`);
  },
};

queryKeyMap.set(faqRepository.create, ['Faq']);
queryKeyMap.set(faqRepository.list, ['Faq']);
queryKeyMap.set(faqRepository.update, ['Faq']);
queryKeyMap.set(faqRepository.remove, ['Faq']);

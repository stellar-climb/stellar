import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Faq, FaqStatus, FaqType } from '../domain/faq.entity';
import { checkLikeValue, convertOptions, stripUndefined, TypeormRelationOptions } from '@libs/utils';

@Injectable()
export class FaqRepository extends DddRepository<Faq> {
  entityClass = Faq;

  async find(
    conditions: {
      id?: number;
      search?: string;
      searchValue?: string;
      type?: FaqType;
      status?: FaqStatus;
      question?: string;
      answer?: string;
    },
    options?: TypeormRelationOptions<Faq>
  ) {
    return this.entityManager.find(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        type: conditions.type,
        status: conditions.status,
        question: conditions.question,
        answer: conditions.answer,
        ...checkLikeValue({ search: conditions.search, searchValue: conditions.searchValue }),
      }),
      ...convertOptions(options),
    });
  }

  async count(conditions: {
    id?: number;
    search?: string;
    searchValue?: string;
    type?: FaqType;
    status?: FaqStatus;
    question?: string;
    answer?: string;
  }) {
    return this.entityManager.count(this.entityClass, {
      where: stripUndefined({
        id: conditions.id,
        type: conditions.type,
        status: conditions.status,
        question: conditions.question,
        answer: conditions.answer,
        ...checkLikeValue({ search: conditions.search, searchValue: conditions.searchValue }),
      }),
    });
  }
}

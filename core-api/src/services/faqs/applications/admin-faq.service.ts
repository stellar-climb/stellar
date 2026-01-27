import { Injectable, BadRequestException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { FaqRepository } from '../repository/faq.repository';
import { Transactional } from '@libs/decorators';
import { Faq, type FaqType } from '../domain/faq.entity';
import { type PaginationOptions } from '@libs/utils';

@Injectable()
export class AdminFaqService extends DddService {
  constructor(private readonly faqRepository: FaqRepository) {
    super();
  }

  @Transactional()
  async create({ type, question, answer }: { type: FaqType; question: string; answer: string }) {
    const [duplicatedFaq] = await this.faqRepository.find({ type, question });

    if (duplicatedFaq) {
      throw new BadRequestException('이미 존재하는 FAQ가 있습니다.');
    }

    const faq = new Faq({ type, question, answer });
    return this.faqRepository.save([faq]);
  }

  async list({ search, searchValue }: { search?: string; searchValue?: string }, options: PaginationOptions) {
    const [faqs, total] = await Promise.all([
      this.faqRepository.find({ search, searchValue }, { options }),
      this.faqRepository.count({ search, searchValue }),
    ]);

    return { items: faqs, total };
  }

  @Transactional()
  async remove({ id }: { id: number }) {
    const [faq] = await this.faqRepository.find({ id });

    if (!faq) {
      throw new BadRequestException('존재하지 않는 FAQ입니다.', { cause: '존재하지 않는 FAQ입니다.' });
    }

    return this.faqRepository.softRemove([faq]);
  }
}

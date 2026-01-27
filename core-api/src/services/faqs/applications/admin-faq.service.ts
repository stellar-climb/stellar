import { Injectable, BadRequestException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { FaqRepository } from '../repository/faq.repository';
import { Transactional } from '@libs/decorators';
import { Faq, type FaqType } from '../domain/faq.entity';

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

  async list() {}
}

import { Module } from '@nestjs/common';
import { AdminFaqController } from './controllers/admin-faq.controller';
import { AdminFaqService } from './applications/admin-faq.service';
import { FaqRepository } from './repository/faq.repository';

@Module({
  controllers: [AdminFaqController],
  providers: [AdminFaqService, FaqRepository],
  exports: [FaqRepository],
})
export class AdminFaqModule {}

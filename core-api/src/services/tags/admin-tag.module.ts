import { Module } from '@nestjs/common';
import { TagRepository } from './repository/tag.repository';
import { AdminTagController } from './controllers/admin-tag.controller';
import { AdminTagService } from './applications/admin-tag.service';

@Module({
  controllers: [AdminTagController],
  providers: [TagRepository, AdminTagService],
  exports: [TagRepository, AdminTagService],
})
export class AdminTagModule {}

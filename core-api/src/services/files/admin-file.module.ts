import { Module } from '@nestjs/common';
import { AdminFileController } from './controllers/admin-file.controller';
import { AdminFileService } from './applications/admin-file.service';
import { FileRepository } from './repository/file.repository';
import { AwsModule } from '@libs/aws';

@Module({
  imports: [AwsModule],
  controllers: [AdminFileController],
  providers: [AdminFileService, FileRepository],
  exports: [FileRepository],
})
export class AdminFileModule {}

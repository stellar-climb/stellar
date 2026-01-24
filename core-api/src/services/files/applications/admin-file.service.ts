import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { FileRepository } from '../repository/file.repository';
import { Transactional } from '@libs/decorators';
import { AwsService } from '@libs/aws';
import { File } from '../domain/file.entity';

@Injectable()
export class AdminFileService extends DddService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly awsService: AwsService
  ) {
    super();
  }

  @Transactional()
  async uploadFile({ file }: { file: Express.Multer.File }) {
    const { url, contentType, filename } = await this.awsService.uploadFile(file);

    const newFile = new File({
      publicUrl: url,
      contentType,
      filename,
    });

    await this.fileRepository.save([newFile]);

    return { url: newFile.publicUrl };
  }
}

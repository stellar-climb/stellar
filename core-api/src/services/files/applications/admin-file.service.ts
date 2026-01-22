import { Injectable } from '@nestjs/common';
import { DddService } from '../../../libs/ddd';
import { FileRepository } from '../repository/file.repository';
import { Transactional } from '../../../libs/decorators';

@Injectable()
export class AdminFileService extends DddService {
  constructor(private readonly fileRepository: FileRepository) {
    super();
  }

  @Transactional()
  async uploadFile({ file }: { file: Express.Multer.File }) {
    return { url: '12321421' };
  }
}

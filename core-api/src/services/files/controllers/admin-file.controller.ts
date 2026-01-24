import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { AdminFileService } from '../applications/admin-file.service';
import { Context } from '@common/context';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('[관리자] 파일 API')
@Controller('admins/files')
@UseGuards(AdminGuard)
export class AdminFileController {
  constructor(
    private readonly adminFileService: AdminFileService,
    private readonly context: Context
  ) {}

  /**
   * 파일 업로드
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminFileService.uploadFile({ file });

    // 4. Send response
    return { data };
  }
}

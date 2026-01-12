import { Controller, UseGuards } from '@nestjs/common';
import { AdminHistoryService } from '../applications/admin-history.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';

@ApiTags('[관리자] 변경 이력 히스토리')
@Controller('admins/histories')
@UseGuards(AdminGuard)
export class AdminHistoryController {
  constructor(private readonly adminHistoryService: AdminHistoryService) {}
}

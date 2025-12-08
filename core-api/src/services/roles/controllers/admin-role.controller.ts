import { Body, Controller, Param, Post } from '@nestjs/common';
import { AdminRoleService } from '../applications/admin-role.service';

@Controller('admins')
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  @Post('/members/:adminId/roles')
  async addRole(@Param('adminId') adminId: string, @Body() body: { name: string }) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
    return { data: {} };
  }
}

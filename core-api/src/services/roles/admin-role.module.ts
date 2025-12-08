import { Module } from '@nestjs/common';
import { AdminRoleController } from './controllers/admin-role.controller';
import { AdminRoleService } from './applications/admin-role.service';
import { RoleRepository } from './repository/role.repository';

@Module({
  controllers: [AdminRoleController],
  providers: [AdminRoleService, RoleRepository],
  exports: [RoleRepository],
})
export class AdminRoleModule {}

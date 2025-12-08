import { Module } from '@nestjs/common';
import { AdminRolePolicyController } from './controllers/admin-role-policy.controller';
import { AdminRolePolicyService } from './applications/admin-role-policy.service';
import { RolePolicyRepository } from './repository/role-policy.repository';

@Module({
  controllers: [AdminRolePolicyController],
  providers: [AdminRolePolicyService, RolePolicyRepository],
  exports: [RolePolicyRepository],
})
export class AdminRolePolicyModule {}

import { Module } from '@nestjs/common';
import { UserGuard } from './user.guard';
import { AdminGuard } from './admin.guard';
import { UserRepository } from '@services/users/repository/user.repository';
import { AdminRepository } from '@services/admins/repository/admin.repository';

@Module({
  providers: [UserGuard, AdminGuard, UserRepository, AdminRepository],
  exports: [UserGuard, AdminGuard, UserRepository, AdminRepository],
})
export class GuardsModule {}

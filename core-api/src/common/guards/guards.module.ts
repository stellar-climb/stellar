import { Module } from '@nestjs/common';
import { UserGuard } from './user.guard';
import { UserRepository } from '@services/users/repository/user.repository';

@Module({
  providers: [UserGuard, UserRepository],
  exports: [UserGuard],
})
export class GuardsModule {}

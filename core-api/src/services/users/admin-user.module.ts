import { Module } from '@nestjs/common';
import { AdminUserController } from './controllers/admin-user.controller';

@Module({
  controllers: [AdminUserController],
})
export class AdminUserModule {}

import { Module } from '@nestjs/common';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminAuthService } from './applications/admin-auth.service';
import { GoogleModule } from '@libs/google';

@Module({
  imports: [GoogleModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}

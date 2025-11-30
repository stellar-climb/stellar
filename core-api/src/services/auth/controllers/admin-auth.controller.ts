import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from '../applications/admin-auth.service';
import { GoogleAuthDto } from './dto';

@Controller('admins/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('sign-in')
  async googleSignIn(@Body() body: GoogleAuthDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminAuthService.googleSignIn({ ...body });

    // 4. Send response
    return { data };
  }
}

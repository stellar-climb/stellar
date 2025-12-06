import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { GoogleService } from '@libs/google';

@Injectable()
export class AdminAuthService extends DddService {
  constructor(private readonly googleService: GoogleService) {
    super();
  }

  @Transactional()
  async googleSignIn({ code }: { code: string }) {
    const { email, name, picture, sub } = await this.googleService.getAccessToken(code);
  }
}

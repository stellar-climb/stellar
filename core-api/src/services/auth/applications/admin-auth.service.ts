import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import axios from 'axios';

@Injectable()
export class AdminAuthService extends DddService {
  constructor() {
    super();
  }

  @Transactional()
  async googleSignIn({ code }: { code: string }) {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      redirect_uri: 'http://localhost:5173/auth/google/callback',
      grant_type: 'authorization_code',
    });
    console.log('tokenResponse', tokenResponse);
  }
}

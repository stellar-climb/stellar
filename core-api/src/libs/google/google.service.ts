import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigsService } from '@configs';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private readonly oauth2Client: OAuth2Client;

  private readonly axiosInstance = axios.create({
    baseURL: 'https://oauth2.googleapis.com',
  });

  constructor(private readonly configsService: ConfigsService) {
    this.oauth2Client = new OAuth2Client(this.configsService.google.clientId);
  }

  async getAccessToken(code: string) {
    const { clientId, clientSecret, redirectUri } = this.configsService.google;
    const response = await this.axiosInstance.post('/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: response.data.id_token,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      email: payload.email ?? '',
      name: payload.name ?? '',
      picture: payload.picture ?? '',
      sub: payload.sub ?? '',
    };
  }
}

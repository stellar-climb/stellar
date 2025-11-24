import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(private readonly configService: NestConfigService) {}

  isProduction() {
    return this.configService.get('NODE_ENV') === 'production';
  }

  isDevelopment() {
    return this.configService.get('NODE_ENV') === 'development';
  }

  isLocal() {
    return this.configService.get('NODE_ENV') === 'local';
  }

  get mysql() {
    const config: DataSourceOptions = {
      type: 'mysql',
      host: this.configService.get('MYSQL_HOST'),
      username: this.configService.get('MYSQL_USERNAME'),
      password: this.configService.get('MYSQL_PASSWORD'),
      database: this.configService.get('MYSQL_DATABASE'),
      port: 3306,
    };

    this.validateConfig(config, 'mysql');
    return config;
  }

  get redis() {
    return {
      host: this.configService.get('REDIS_HOST'),
      port: 6379,
    };
  }

  private validateConfig(config: Record<string, any>, name: string) {
    if (process.env.SWAGGER_GEN) {
      return;
    }

    Object.entries(config).forEach(([key, value]) => {
      if (value === undefined) {
        throw new Error(`${key}'s ${name} config is required. check .env file.`);
      }
    });
  }
}

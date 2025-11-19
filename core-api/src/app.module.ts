import { Module } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { HealthController } from './health.controller';
import { DatabasesModule } from '@databases';

@Module({
  imports: [ConfigsModule, DatabasesModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

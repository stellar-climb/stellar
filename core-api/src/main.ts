import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';
import { ConfigsService } from './configs';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });
  const configsService = app.get(ConfigsService);

  app.enableCors({
    origin: configsService.isLocal() ? '*' : ['https://back-office.stellar-climb.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Enable shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000, () => {
    logger.log(`Server is running on port ${3000}.🚀 `);
  });
})();

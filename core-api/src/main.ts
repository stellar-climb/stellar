import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({});

  // Enable shutdown hooks
  app.enableShutdownHooks();

  await app.listen(3000, () => {
    logger.log(`Server is running on port ${3000}.🚀 `);
  });
})();

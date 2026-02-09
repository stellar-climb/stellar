import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@libs/logger';

(async () => {
  const app = await NestFactory.create(AppModule, { logger });
  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Enable shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}.🚀 `);
  });
})();

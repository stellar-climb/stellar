import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  // Enable shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}.🚀 `);
  });
})();

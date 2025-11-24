import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import generals from './services/generals';
import admins from './services/admins';
import { PaginationDto } from '@common/dto';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  // Enable shutdown hooks
  app.enableShutdownHooks();

  // Swagger json 파일 생성
  // const config = new DocumentBuilder()
  //   .setTitle('Core API')
  //   .setDescription('Core API description')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const swaggerDocument = SwaggerModule.createDocument(app, config, {
  //   include: [...generals],
  //   extraModels: [PaginationDto],
  // });
  // fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDocument));

  // // Swagger Admin
  // const adminConfig = new DocumentBuilder()
  //   .setTitle('Core API Admin')
  //   .setDescription('Core API Admin description')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const adminSwaggerDocument = SwaggerModule.createDocument(app, adminConfig, {
  //   include: [...admins],
  //   extraModels: [PaginationDto],
  // });
  // fs.writeFileSync('./swagger-admin.json', JSON.stringify(adminSwaggerDocument));

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}.🚀 `);
  });
})();

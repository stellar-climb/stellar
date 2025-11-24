import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { PaginationDto } from '@common/dto';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import generals from '@services/generals';
import admins from '@services/admins';
import { Test } from '@nestjs/testing';
import fs from 'fs';
import { DataSource } from 'typeorm';

async function generateSwagger() {
  const memoryDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [], // 스웨거 생성엔 엔티티 정보가 굳이 필요 없습니다 (빈 배열 OK)
    synchronize: true,
    dropSchema: true,
  });

  await memoryDataSource.initialize();

  // 3. 테스트 모듈을 사용해 의존성을 바꿔치기(Override) 합니다.
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DataSource) // "야, DataSource 필요하면..."
    .useValue(memoryDataSource) // "MySQL 말고 내가 만든 이거 갖다 써."
    .compile();

  const app = moduleFixture.createNestApplication();

  // Swagger json 파일 생성
  const config = new DocumentBuilder()
    .setTitle('Core API')
    .setDescription('Core API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, config, {
    include: [...generals],
    extraModels: [PaginationDto],
  });
  fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDocument));

  // Swagger Admin
  const adminConfig = new DocumentBuilder()
    .setTitle('Core API Admin')
    .setDescription('Core API Admin description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const adminSwaggerDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [...admins],
    extraModels: [PaginationDto],
  });
  fs.writeFileSync('./swagger-admin.json', JSON.stringify(adminSwaggerDocument));

  await app.close();
  // await memoryDataSource.destroy();
}

generateSwagger();

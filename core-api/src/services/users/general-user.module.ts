import { Module } from '@nestjs/common';
import { GeneralUserController } from './controllers/general-user.controller';

@Module({
  controllers: [GeneralUserController],
})
export class GeneralUserModule {}

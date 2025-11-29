import { Module } from '@nestjs/common';
import { GeneralUserController } from './controllers/general-user.controller';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [GeneralUserController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class GeneralUserModule {}

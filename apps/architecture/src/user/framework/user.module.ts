import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { UserRepository } from '../data/user.repository';
import { UserServiceInterface } from '../application/user.service.interface';
import { UserService } from '../application/user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository,
    },
    {
      provide: UserServiceInterface,
      useClass: UserService,
    },
  ],
  exports: [UserRepositoryInterface],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { UserMemoryRepository } from '../data/user.memory.repository';
import { UserServiceInterface } from '../application/user.service.interface';
import { UserService } from '../application/user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryInterface,
      useValue: UserMemoryRepository,
    },
    {
      provide: UserServiceInterface,
      useValue: UserService,
    },
  ],
})
export class UserModule {}

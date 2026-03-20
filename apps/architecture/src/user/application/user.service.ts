import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/user';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(UserRepositoryInterface)
    private userRepository: UserRepositoryInterface,
  ) {}

  create(createUserDto: CreateUserDto): void {
    const user = User.create(createUserDto.email, createUserDto.password);

    this.userRepository.insert(user);
  }

  update(updateUserDto: UpdateUserDto): void {
    const user = this.userRepository.findById(updateUserDto.id);

    if (null === user) {
      return;
    }

    if (undefined !== updateUserDto.email) {
      user.setEmail(updateUserDto.email);
    }

    if (undefined !== updateUserDto.password) {
      user.setPassword(updateUserDto.password);
    }

    this.userRepository.update(user);
  }

  delete(deleteUserDto: DeleteUserDto): void {
    this.userRepository.delete(deleteUserDto.id);
  }

  getAll(): User[] {
    return this.userRepository.findAll();
  }
}

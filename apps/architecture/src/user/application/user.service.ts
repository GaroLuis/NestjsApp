import { UserServiceInterface } from './user.service.interface';
import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/user';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(UserRepositoryInterface)
    private userRepository: UserRepositoryInterface,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = User.create(createUserDto.email);
    user.setPassword(createUserDto.password);

    await this.userRepository.insert(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<void> {
    if (!updateUserDto.id) {
      throw new NotFoundException();
    }

    const user = await this.userRepository.findById(updateUserDto.id);

    if (null === user) {
      return;
    }

    if (undefined !== updateUserDto.email) {
      user.setEmail(updateUserDto.email);
    }

    if (undefined !== updateUserDto.password) {
      user.setPassword(updateUserDto.password);
    }

    await this.userRepository.update(user);
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<void> {
    await this.userRepository.delete(deleteUserDto.id);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}

import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../domain/user';

export interface UserServiceInterface {
  create(createUserDto: CreateUserDto): void;
  update(updateUserDto: UpdateUserDto): void;
  delete(deleteUserDto: DeleteUserDto): void;
  getAll(): User[];
}

export const UserServiceInterface = Symbol('UserServiceInterface');

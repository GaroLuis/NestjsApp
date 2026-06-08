import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../domain/user';

export interface UserServiceInterface {
  create(createUserDto: CreateUserDto): Promise<void>;
  update(updateUserDto: UpdateUserDto): Promise<void>;
  delete(deleteUserDto: DeleteUserDto): Promise<void>;
  getAll(): Promise<User[]>;
}

export const UserServiceInterface = Symbol('UserServiceInterface');

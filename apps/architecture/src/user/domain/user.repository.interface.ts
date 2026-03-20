import { User } from './user';

export interface UserRepositoryInterface {
  insert(user: User): void;
  delete(id: string): void;
  update(user: User): void;
  findAll(): User[];
  findById(id: string): User | null;
}

export const UserRepositoryInterface = Symbol('UserRepositoryInterface');

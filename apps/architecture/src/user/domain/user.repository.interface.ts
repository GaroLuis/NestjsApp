import { User } from './user';

export interface UserRepositoryInterface {
  insert(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  update(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}

export const UserRepositoryInterface = Symbol('UserRepositoryInterface');

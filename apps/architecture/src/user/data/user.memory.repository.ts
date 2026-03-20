import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { User } from '../domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMemoryRepository implements UserRepositoryInterface {
  private users: User[] = [];

  insert(user: User): void {
    this.users.push(user);
  }

  delete(id: string): void {
    this.users = this.users.filter((u) => id !== u.getId());
  }

  update(user: User): void {
    this.users.map((u) => {
      if (u.getId() === user.getId()) {
        return user;
      }

      return u;
    });
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | null {
    return this.users.find((u) => id === u.getId()) ?? null;
  }
}

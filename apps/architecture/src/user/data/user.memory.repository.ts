import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { User } from '../domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMemoryRepository implements UserRepositoryInterface {
  private users: User[] = [];

  async insert(user: User): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(() => resolve(this.users.push(user))),
    );
  }

  async delete(id: string): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(() =>
        resolve((this.users = this.users.filter((u) => id !== u.getId()))),
      ),
    );
  }

  async update(user: User): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(() =>
        resolve(
          this.users.map((u) => {
            if (u.getId() === user.getId()) {
              return user;
            }

            return u;
          }),
        ),
      ),
    );
  }

  async findAll(): Promise<User[]> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(this.users)),
    );
  }

  async findById(id: string): Promise<User | null> {
    return await new Promise((resolve) =>
      setTimeout(() =>
        resolve(this.users.find((u) => id === u.getId()) ?? null),
      ),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return await new Promise((resolve) =>
      setTimeout(() =>
        resolve(this.users.find((u) => u.getEmail() === email) ?? null),
      ),
    );
  }
}

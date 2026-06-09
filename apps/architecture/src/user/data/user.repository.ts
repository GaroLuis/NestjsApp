import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { User } from '../domain/user';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly em: EntityManager) {}

  async insert(user: User): Promise<void> {
    const password = user.getPassword();

    if (!password) {
      throw new Error('Invalid password');
    }

    const entity = this.em.create(UserEntity, {
      email: user.getEmail(),
      password: password,
    });

    this.em.persist(entity);
    await this.em.flush();
  }

  async delete(id: string): Promise<void> {
    const user = await this.em.findOne(UserEntity, id);

    if (!user) {
      return;
    }

    this.em.remove(user);
    await this.em.flush();
  }

  async update(user: User): Promise<void> {
    const id = user.getId();

    if (null === id) {
      return;
    }

    const entity = await this.em.findOne(UserEntity, id);

    if (null === entity) {
      return;
    }

    if (user.getEmail()) {
      entity.email = user.getEmail();
    }

    const password = user.getPassword();
    if (password) {
      entity.password = password;
    }

    await this.em.flush();
  }

  async findAll(): Promise<User[]> {
    const users = await this.em.findAll(UserEntity);

    return users.map((u) => User.create(u.email));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.em.findOne(UserEntity, id);

    if (null === user) {
      return null;
    }

    return User.create(user.email);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.em.findOne(UserEntity, { email });

    if (null === user) {
      return null;
    }

    const domain = User.create(user.email);
    domain.setPassword(user.password);

    return domain;
  }
}

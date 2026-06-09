import { User } from '../domain/user';
import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  class DefaultRepository implements UserRepositoryInterface {
    insert(): Promise<void> {
      throw new Error('Method not implemented.');
    }

    delete(): Promise<void> {
      throw new Error('Method not implemented.');
    }

    update(): Promise<void> {
      throw new Error('Method not implemented.');
    }

    findAll(): Promise<User[]> {
      throw new Error('Method not implemented.');
    }

    findById(): Promise<User> {
      throw new Error('Method not implemented.');
    }

    findByEmail(): Promise<User | null> {
      throw new Error('Method not implemented.');
    }
  }

  const getService = (repository: UserRepositoryInterface) => {
    return new UserService(repository);
  };

  describe('getAll', () => {
    it('should return result from repository', async () => {
      const user = User.create('email@test.com');
      user.setPassword('12345');
      const users: User[] = [user];

      const service = getService(
        new (class extends DefaultRepository {
          findAll(): Promise<User[]> {
            return new Promise((resolve) => setTimeout(() => resolve(users)));
          }
        })(),
      );

      expect(await service.getAll()).toBe(users);
    });
  });
});

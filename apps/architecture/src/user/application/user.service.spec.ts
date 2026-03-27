import { User } from '../domain/user';
import { UserRepositoryInterface } from '../domain/user.repository.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  class DefaultRepository implements UserRepositoryInterface {
    insert(): User[] {
      throw new Error('Method not implemented.');
    }

    delete(): void {
      throw new Error('Method not implemented.');
    }

    update(): void {
      throw new Error('Method not implemented.');
    }

    findAll(): User[] {
      throw new Error('Method not implemented.');
    }

    findById(): User {
      throw new Error('Method not implemented.');
    }
  }

  const getService = (repository: UserRepositoryInterface) => {
    return new UserService(repository);
  };

  describe('getAll', () => {
    it('should return result from repository', () => {
      const users: User[] = [User.create('email@test.com', '123456')];

      const service = getService(
        new (class extends DefaultRepository {
          getAll(): User[] {
            return users;
          }
        })(),
      );

      expect(service.getAll()).toBe(users);
    });
  });
});

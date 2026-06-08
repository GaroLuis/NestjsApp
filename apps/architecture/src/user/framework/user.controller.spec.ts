import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceInterface } from '../application/user.service.interface';
import { User } from '../domain/user';

describe('UserController', () => {
  class DefaultService implements UserServiceInterface {
    getAll(): Promise<User[]> {
      throw new Error('Method not implemented.');
    }

    create(): Promise<void> {
      throw new Error('Method not implemented.');
    }

    update(): Promise<void> {
      throw new Error('Method not implemented.');
    }

    delete(): Promise<void> {
      throw new Error('Method not implemented.');
    }
  }

  const getController = async (service: UserServiceInterface) => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserServiceInterface,
          useValue: service,
        },
      ],
    }).compile();

    return app.get<UserController>(UserController);
  };

  describe('getUsers', () => {
    it('should return result from service', async () => {
      const user = User.create('email@test.com');
      user.setPassword('12345');
      const users: User[] = [user];

      const controller = await getController(
        new (class extends DefaultService {
          getAll(): Promise<User[]> {
            return new Promise((resolve) => setTimeout(() => resolve(users)));
          }
        })(),
      );

      expect(await controller.getUsers()).toBe(users);
    });
  });
});

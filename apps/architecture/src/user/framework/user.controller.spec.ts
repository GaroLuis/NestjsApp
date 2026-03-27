import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceInterface } from '../application/user.service.interface';
import { User } from '../domain/user';

describe('UserController', () => {
  class DefaultService implements UserServiceInterface {
    getAll(): User[] {
      throw new Error('Method not implemented.');
    }

    create(): void {
      throw new Error('Method not implemented.');
    }

    update(): void {
      throw new Error('Method not implemented.');
    }

    delete(): void {
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
      const users: User[] = [User.create('email@test.com', '123456')];

      const controller = await getController(
        new (class extends DefaultService {
          getAll(): User[] {
            return users;
          }
        })(),
      );

      expect(controller.getUsers()).toBe(users);
    });
  });
});

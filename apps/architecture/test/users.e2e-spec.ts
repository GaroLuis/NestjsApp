import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from '../src/user/data/user.entity';
import { CreateUserDto } from '../src/user/application/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let em: EntityManager;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    em = app.get(EntityManager);

    const ctx = em.fork();
    const entity = ctx.create(UserEntity, {
      email: 'fixture@test.com',
      password: 'fixturepass123',
    });
    await ctx.persist(entity).flush();
    createdUserId = entity.id;
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users (POST)', () => {
    const body: CreateUserDto = {
      email: 'testing@email.com',
      password: 'testing',
    };

    return request(app.getHttpServer()).post('/users').send(body).expect(201);
  });

  it('/users/{id} (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .send({ email: 'updated@test.com', password: 'updatedpass123' })
      .expect(200);
  });

  it('/users/{id} (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

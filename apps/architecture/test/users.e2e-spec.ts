import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from '../src/user/data/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let em: EntityManager;
  let createdUserId: string;
  let accessToken: string;

  const fixtureUser = {
    email: 'fixture@test.com',
    password: 'fixturepass123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    em = app.get(EntityManager);

    const ctx = em.fork();
    await ctx.nativeDelete(UserEntity, {});
    const entity = ctx.create(UserEntity, {
      email: fixtureUser.email,
      password: fixtureUser.password,
    });
    await ctx.persist(entity).flush();
    createdUserId = entity.id;

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: fixtureUser.email, password: fixtureUser.password })
      .expect(200);

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login should reject invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: fixtureUser.email, password: 'wrong' })
      .expect(401);
  });

  it('/auth/login should be case-insensitive for email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'FIXTURE@TEST.COM', password: fixtureUser.password })
      .expect(200);
  });

  it('/users (GET) should reject without token', () => {
    return request(app.getHttpServer()).get('/users').expect(401);
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ email: 'testing@email.com', password: 'testing123' })
      .expect(201);
  });

  it('/users/{id} (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ email: 'updated@test.com', password: 'updatedpass123' })
      .expect(200);
  });

  it('/users/{id} (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});

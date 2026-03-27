import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/user/application/dto/create-user.dto';
import { UpdateUserDto } from '../src/user/application/dto/update-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users (POST)', () => {
    const body: CreateUserDto = {
      email: 'testing@email.com',
      password: 'testing',
    };

    return request(app.getHttpServer()).post('/users').send(body).expect(201);
  });

  it('/users/{id} (PUT)', () => {
    const body: UpdateUserDto = {
      email: 'testing@email.com',
      password: 'testing',
    };

    return request(app.getHttpServer())
      .put('/users/1234')
      .send(body)
      .expect(200);
  });

  it('/users/{id} (DELETE)', () => {
    return request(app.getHttpServer()).delete('/users/1234').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

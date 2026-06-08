import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  dbName: 'nestjs-architecture',
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'password',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: true,
  migrations: {
    pathTs: './apps/architecture/migrations',
  },
});

import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  dbName: process.env.DB_NAME ?? 'nestjs-architecture',
  host: process.env.DB_HOST ?? 'db',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'password',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: process.env.DB_DEBUG === 'true',
  migrations: {
    pathTs: './migrations',
  },
});

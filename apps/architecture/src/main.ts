import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config({ path: '.env' });
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev';
config({ path: envFile });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

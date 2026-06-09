import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

const projectRoot = join(__dirname, '..', '..');

config({ path: join(projectRoot, '.env') });
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev';
config({ path: join(projectRoot, envFile), override: true });

async function bootstrap() {
  const tlsEnabled = process.env.TLS_ENABLED === 'true';
  const port = tlsEnabled
    ? (process.env.TLS_PORT ?? 3443)
    : (process.env.PORT ?? 3000);

  const app = await NestFactory.create(
    AppModule,
    tlsEnabled
      ? {
          httpsOptions: {
            key: readFileSync(join(projectRoot, process.env.TLS_KEY_PATH!)),
            cert: readFileSync(join(projectRoot, process.env.TLS_CERT_PATH!)),
          },
        }
      : undefined,
  );

  await app.listen(port);
}
void bootstrap();

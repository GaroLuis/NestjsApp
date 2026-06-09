import { Module } from '@nestjs/common';
import { UserModule } from './user/framework/user.module';
import { AuthModule } from './auth/auth.module';
import config from '../config/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [UserModule, AuthModule, MikroOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}

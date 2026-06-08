import { Module } from '@nestjs/common';
import { UserModule } from './user/framework/user.module';
import config from '../config/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [UserModule, MikroOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}

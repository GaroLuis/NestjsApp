import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceInterface } from './auth.service.interface';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/framework/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jwt-secret-key-change-in-production',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AuthServiceInterface, useClass: AuthService },
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule, AuthServiceInterface],
})
export class AuthModule {}

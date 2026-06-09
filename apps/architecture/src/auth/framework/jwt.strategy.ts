import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepositoryInterface } from '../../user/domain/user.repository.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { email: user.getEmail() };
  }
}

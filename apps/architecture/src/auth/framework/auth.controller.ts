import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthServiceInterface } from '../application/auth.service.interface';
import { LoginDto } from '../application/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceInterface)
    private readonly authService: AuthServiceInterface,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}

import { LoginDto } from './dto/login.dto';

export interface AuthServiceInterface {
  login(loginDto: LoginDto): Promise<{ accessToken: string }>;
}

export const AuthServiceInterface = Symbol('AuthServiceInterface');

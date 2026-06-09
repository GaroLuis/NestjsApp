import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserServiceInterface } from '../application/user.service.interface';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { DeleteUserDto } from '../application/dto/delete-user.dto';
import { User } from '../domain/user';
import { JwtAuthGuard } from '../../auth/framework/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserServiceInterface)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() request: CreateUserDto): Promise<void> {
    await this.userService.create(request);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserDto,
  ): Promise<void> {
    request.id = id;

    await this.userService.update(request);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param() params: DeleteUserDto): Promise<void> {
    await this.userService.delete(params);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }
}

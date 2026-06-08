import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { UserServiceInterface } from '../application/user.service.interface';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { DeleteUserDto } from '../application/dto/delete-user.dto';
import { User } from '../domain/user';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserServiceInterface)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDto): Promise<void> {
    await this.userService.create(request);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserDto,
  ): Promise<void> {
    request.id = id;

    await this.userService.update(request);
  }

  @Delete(':id')
  async deleteUser(@Param() params: DeleteUserDto): Promise<void> {
    await this.userService.delete(params);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }
}

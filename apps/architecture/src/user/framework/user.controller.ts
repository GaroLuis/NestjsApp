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
  createUser(@Body() request: CreateUserDto): void {
    this.userService.create(request);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() request: UpdateUserDto): void {
    request.id = id;

    this.userService.update(request);
  }

  @Delete(':id')
  deleteUser(@Param() params: DeleteUserDto): void {
    this.userService.delete(params);
  }

  @Get()
  getUsers(): User[] {
    return this.userService.getAll();
  }
}

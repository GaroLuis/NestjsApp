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

@Controller()
export class UserController {
  constructor(
    @Inject(UserServiceInterface)
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  createUser(@Body() request: CreateUserDto): void {
    this.userService.create(request);
  }

  @Put()
  updateUser(@Body() request: UpdateUserDto): void {
    this.userService.update(request);
  }

  @Delete()
  deleteUser(@Param() request: DeleteUserDto): void {
    this.userService.delete(request);
  }

  @Get()
  getUsers(): User[] {
    return this.userService.getAll();
  }
}

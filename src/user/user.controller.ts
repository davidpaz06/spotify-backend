import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  UseInterceptors,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerInterceptor } from 'src/interceptors/logger/logger.interceptor';

@Controller('user')
@UseInterceptors(LoggerInterceptor)
//
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() user: CreateUserDto) {
    try {
      await this.userService.create(user);
      return this.login(user);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @HttpCode(201)
  login(@Body() user: CreateUserDto) {
    const res = this.userService.login(user);
    return res;
  }

  @Delete()
  @HttpCode(201)
  delete(@Query('username') username: string) {
    return this.userService.delete(username);
  }

  @Get('health')
  @HttpCode(201)
  userHealth() {
    return { message: 'User is ok' };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { LoggerInterceptor } from 'src/logger/logger.interceptor';

@Controller('user')
@UseInterceptors(LoggerInterceptor)
//
export class UserController {
  constructor(private userService: UserService) {}

  @Get('greet')
  @HttpCode(200)
  Greet() {
    return 'Hello from user controller!';
  }

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
}

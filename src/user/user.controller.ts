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
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('login')
  @HttpCode(201)
  login(@Body() user: CreateUserDto) {
    const res = this.userService.login(user);
    return res;
  }
}

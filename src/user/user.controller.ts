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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
//
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post(':id')
  @HttpCode(201)
  login(@Body() user: CreateUserDto) {
    const res = this.userService.create(user);
    return res;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: user.username },
      });

      if (!user.username || !user.password) {
        throw new HttpException(
          'Username and password are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      const hashedPassword = await argon2.hash(user.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 10,
        timeCost: 2,
        parallelism: 2,
      });

      const newUser = await this.prisma.user.create({
        data: {
          username: user.username,
          password: hashedPassword,
        },
      });
      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(req) {
    const user = await this.prisma.user.findUnique({
      where: { username: req.username },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await argon2.verify(user.password, req.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.auth.tokenize(user);

    return {
      ...tokens,
    };
  }
}

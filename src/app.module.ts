import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

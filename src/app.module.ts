import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, AuthModule, SongModule, ArtistModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

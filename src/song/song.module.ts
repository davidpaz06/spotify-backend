import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SpotifyAuthService } from 'src/auth/spotify-auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [SongController],
  providers: [SongService, SpotifyAuthService],
})
export class SongModule {}

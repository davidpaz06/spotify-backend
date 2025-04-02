import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SpotifyAuthService } from 'src/auth/spotify-auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ArtistController],
  providers: [ArtistService, SpotifyAuthService],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SpotifyAuthService } from 'src/auth/spotify-auth.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, SpotifyAuthService],
})
export class ArtistModule {}

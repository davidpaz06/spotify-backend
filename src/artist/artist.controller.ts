import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FormatResponseInterceptor } from 'src/interceptors/formatresponse/formatresponse.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('artist')
@UseInterceptors(FormatResponseInterceptor)
@UseGuards(AuthGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':artist')
  findArtistByName(@Param('artist') artist: string, @Req() request: any) {
    const spotifyAccessToken = request.spotifyAccessToken;
    console.log('Spotify Access Token in Controller:', spotifyAccessToken);
    if (!spotifyAccessToken) {
      throw new Error('Spotify Access Token is missing');
    }
    return this.artistService.findArtistByName(artist, spotifyAccessToken);
  }

  @Get('me')
  getMe() {
    return this.artistService.getMe();
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FormatResponseInterceptor } from 'src/interceptors/formatresponse/formatresponse.interceptor';

@Controller('artist')
@UseInterceptors(FormatResponseInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':artist')
  findArtistByName(@Param('artist') artist: string) {
    return this.artistService.findArtistByName(artist);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}

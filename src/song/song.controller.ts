import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { LoggerInterceptor } from 'src/interceptors/logger/logger.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('track')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get(':track')
  findAll(@Param('track') track: string, @Req() request: any) {
    const spotifyAccessToken = request.spotifyAccessToken;
    return this.songService.findAll(track, spotifyAccessToken);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}

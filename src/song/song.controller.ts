import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { LoggerInterceptor } from 'src/interceptors/logger/logger.interceptor';

@Controller('song')
@UseInterceptors(LoggerInterceptor)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @Get('getToken')
  getSongs() {
    return this.songService.getToken();
  }

  @Get(':artist')
  findAll(@Param('artist') artist: string) {
    return this.songService.findAll(artist);
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

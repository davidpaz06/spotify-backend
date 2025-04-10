import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from '../auth/auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger/logger.interceptor';

@Controller('playlist')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('create')
  @HttpCode(201)
  createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.createPlaylist(createPlaylistDto);
  }

  @Get('/user/:user')
  @HttpCode(200)
  findUserPlaylist(@Param('user') userId: string) {
    return this.playlistService.findUserPlaylist(+userId);
  }

  @Patch(':id/rename')
  @HttpCode(200)
  updatePlaylistName(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.updatePlaylistName(+id, updatePlaylistDto);
  }

  @Patch(':id/add')
  @HttpCode(200)
  addToPlaylist(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.addToPlaylist(+id, updatePlaylistDto);
  }

  @Delete(':id/remove')
  @HttpCode(200)
  removeFromPlaylist(@Param('id') id: string, @Body() body: any) {
    const { song } = body;
    const { id: songId, name: songName, duration: songDuration } = song;
    return this.playlistService.removeFromPlaylist(
      +id,
      songId,
      songName,
      songDuration,
    );
  }

  @Delete('delete/:id')
  @HttpCode(200)
  deletePlaylist(@Param('id') id: string) {
    return this.playlistService.deletePlaylist(+id);
  }

  @Get('health')
  @HttpCode(200)
  playlistHealth() {
    try {
      return { status: 'Playlist is OK' };
    } catch (error) {
      return { status: 'Playlist is not OK', error: error.message };
    }
  }
}

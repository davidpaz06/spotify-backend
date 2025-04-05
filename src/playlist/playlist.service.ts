import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    try {
      if (!createPlaylistDto.playlist_name || !createPlaylistDto.created_by) {
        throw new HttpException(
          'Playlist name and creator ID are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newPlaylist = await this.prisma.playlist.create({
        data: {
          playlist_name: createPlaylistDto.playlist_name,
          created_by: createPlaylistDto.created_by,
          playlist_length: 0,
        },
      });

      return newPlaylist;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findUserPlaylist() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}

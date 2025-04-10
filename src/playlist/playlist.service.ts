import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async createPlaylist(createPlaylistDto: CreatePlaylistDto) {
    const { playlist_name, created_by } = createPlaylistDto;
    console.log(playlist_name, created_by);
    try {
      if (!playlist_name || !created_by) {
        throw new HttpException(
          'Playlist name and creator ID are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newPlaylist = await this.prisma.playlist.create({
        data: {
          playlist_name: playlist_name,
          created_by: created_by,
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

  async findUserPlaylist(id: number) {
    try {
      const playlists = await this.prisma.playlist.findMany({
        where: {
          created_by: id,
        },
      });

      return playlists;
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

  async updatePlaylistName(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    try {
      const { playlist_name } = updatePlaylistDto;

      if (!playlist_name) {
        throw new HttpException(
          'Playlist name is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedPlaylist = await this.prisma.playlist.update({
        where: { playlist_id: id },
        data: { playlist_name },
      });

      return {
        message: `Playlist renamed to ${playlist_name}`,
        updatedPlaylist,
      };
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

  async addToPlaylist(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    try {
      const { song } = updatePlaylistDto;

      const songInPlaylist = await this.prisma.playlistSong.findFirst({
        where: {
          playlist_id: id,
          song_id: song.id,
        },
      });

      if (songInPlaylist) {
        throw new HttpException(
          'Song already exists in the playlist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingSong = await this.prisma.song.findFirst({
        where: {
          song_id: song.id,
        },
      });

      if (!existingSong) {
        await this.prisma.song.create({
          data: {
            song_id: song.id,
            song_data: {
              artist: song.artist,
              album: song.album,
              name: song.name,
              duration: song.duration,
              preview: song.preview,
              image: song.image,
            },
          },
        });
      }

      const updatedPlaylist = await this.prisma.playlistSong.create({
        data: {
          playlist_id: id,
          song_id: song.id,
        },
      });

      await this.prisma.playlist.update({
        where: { playlist_id: id },
        data: {
          playlist_length: {
            increment: song.duration,
          },
        },
      });

      return updatedPlaylist;
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

  async removeFromPlaylist(
    id: number,
    songId: string,
    songName: string,
    songDuration: number,
  ) {
    try {
      await this.prisma.playlistSong.delete({
        where: {
          playlist_id_song_id: {
            playlist_id: id,
            song_id: songId,
          },
        },
      });

      await this.prisma.playlist.update({
        where: { playlist_id: id },
        data: {
          playlist_length: {
            decrement: songDuration,
          },
        },
      });

      return { message: `${songName} removed from playlist successfully` };
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

  async deletePlaylist(id: number) {
    try {
      await this.prisma.playlist.delete({
        where: { playlist_id: id },
      });
      return { message: 'Playlist deleted successfully' };
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
}

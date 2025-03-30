import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SpotifyAuthService } from 'src/auth/spotify-auth.service';

@Injectable()
export class SongService {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  async getToken() {
    return await this.spotifyAuthService.getAccessToken();
  }

  async findAll(artist: string) {
    const query = encodeURIComponent(`artist:${artist}`);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`;

    try {
      const accessToken = await this.spotifyAuthService.getAccessToken();

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const id = response.data.artists.items[0].id;

      const topSongs = axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const albums = axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const [albumsResponse, songsResponse] = await Promise.all([
        albums,
        topSongs,
      ]);

      return {
        albums: albumsResponse.data.items.map((album) => ({
          name: album.name,
          artist: album.artists[0].name,
          release_date: album.release_date,
          total_tracks: album.total_tracks,
          image: album.images[0].url,
        })),

        topSongs: songsResponse.data.tracks.map((song) => ({
          album: song.album.name,
          name: song.name,
          duration: song.duration_ms,
          preview: song.external_urls.spotify,
          image: song.album.images[0].url,
        })),
      };
    } catch (error) {
      console.error('Error fetching songs from Spotify:', error);
      throw new Error('Failed to fetch songs from Spotify');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}

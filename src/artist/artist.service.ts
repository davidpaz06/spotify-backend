import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { SpotifyAuthService } from 'src/auth/spotify-auth.service';

@Injectable()
export class ArtistService {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}
  create(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
  }

  async findArtistByName(artist, accessToken) {
    const query = encodeURIComponent(`artist:${artist}`);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (!accessToken) {
      throw new Error('Failed to fetch access token');
    }

    const fetch = await axios.get(url, {
      headers: headers,
    });

    if (!fetch.data.artists.items.length) {
      throw new Error('No artist found');
    }

    const topSongs = await axios.get(
      `https://api.spotify.com/v1/artists/${fetch.data.artists.items[0].id}/top-tracks?market=US`,
      {
        headers: headers,
      },
    );

    const albums = await axios.get(
      `https://api.spotify.com/v1/artists/${fetch.data.artists.items[0].id}/albums`,
      {
        headers: headers,
      },
    );

    return {
      id: fetch.data.artists.items[0].id,
      name: fetch.data.artists.items[0].name,
      followers: fetch.data.artists.items[0].followers.total,
      popularity: fetch.data.artists.items[0].popularity,
      genres: fetch.data.artists.items[0].genres,
      topSongs: topSongs.data.tracks.map((song) => ({
        name: song.name,
        preview: song.external_urls.spotify,
        image: song.album.images[0].url,
      })),
      albums: albums.data.items.map((album) => ({
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        image: album.images[0].url,
      })),

      image: fetch.data.artists.items[0].images[0]?.url || null,
    };
  }

  async getMe() {
    const url = 'https://api.spotify.com/v1/me';
    try {
      const accessToken = await this.spotifyAuthService.getAccessToken();
      if (!accessToken) {
        throw new Error('Failed to fetch access token');
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}

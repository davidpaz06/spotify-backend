import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyAuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    try {
      const url = 'https://accounts.spotify.com/api/token';
      const params = new URLSearchParams();
      if (process.env.SPOTIFY_AUTH_CODE) {
        params.append('grant_type', 'authorization_code');
        params.append('code', process.env.SPOTIFY_AUTH_CODE);
        params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI!);
      } else {
        params.append('grant_type', 'client_credentials');
      }

      const response = await axios.post(url, params, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

      setTimeout(() => {
        this.accessToken = null;
      }, response.data.expires_in * 1000);

      return this.accessToken!;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      throw new HttpException(
        'Failed to fetch Spotify access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshAccessToken(): Promise<string> {
    try {
      const url = 'https://accounts.spotify.com/api/token';
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', this.refreshToken!);

      const response = await axios.post(url, params, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      this.accessToken = response.data.access_token;

      setTimeout(() => {
        this.accessToken = null;
      }, response.data.expires_in * 1000);

      return this.accessToken!;
    } catch (error) {
      console.error('Error refreshing Spotify access token:', error);
      throw new HttpException(
        'Failed to refresh Spotify access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

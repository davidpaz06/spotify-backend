import { Controller, Get, Query, Redirect } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Redirect()
  login() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI!);
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
    return { url };
  }

  @Get('callback')
  callback(@Query('code') code: string) {
    // Guarda el Authorization Code en una variable de entorno o base de datos
    process.env.SPOTIFY_AUTH_CODE = code;
    return { message: 'Authorization code received', code };
  }
}

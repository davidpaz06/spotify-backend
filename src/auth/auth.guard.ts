import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('GUARD');
    const token = this.extractTokenFromHeader(request, 'authorization');
    const spotifyAccessToken = this.extractTokenFromHeader(
      request,
      'spotifyauthorization',
    );

    if (!token || !spotifyAccessToken) {
      return false;
    }
    try {
      const payload = this.jwtService.verify(token);
      console.log('Payload: ', payload);
      console.log('header: ', request.headers);
      request.user = payload;
      request.spotifyAccessToken = spotifyAccessToken;
    } catch {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(
    request: any,
    headerName: string,
  ): string | null {
    const headerValue = request.headers[headerName.toLowerCase()];
    if (!headerValue) {
      return null;
    }

    const [type, token] = headerValue.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}

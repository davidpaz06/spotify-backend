import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdatePlaylistDto {
  @IsOptional()
  @IsString()
  playlist_name: string;

  @IsOptional()
  @IsObject()
  song: {
    id: string;
    artist: string;
    album: string;
    name: string;
    duration: number;
    preview: string;
    image: string;
  };
}

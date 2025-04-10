import { IsInt, IsString, Min, IsOptional } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  playlist_name: string;

  @IsInt()
  created_by: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  playlist_length?: number;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  _id: string;
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  location: string;

  @IsString()
  imgUrl?: string;

  @IsString()
  organizer: string;

  @IsOptional()
  imageUrl?: string;
}

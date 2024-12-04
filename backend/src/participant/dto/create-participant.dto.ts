import { SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateParticipantDto {
  // _id: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cni: string;

  @IsMongoId()
  @IsNotEmpty()
  event: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Event);

// participant.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from '../../events/entities/event.entity';
import { HydratedDocument } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema({ timestamps: true })
export class Participant {
  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cni: string;

  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  event: Event;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

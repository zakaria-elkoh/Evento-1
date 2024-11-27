import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.schema';
// import { User } from '../users/user.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  imgUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  organizer: User;

  @Prop({ default: 0 })
  totalPlaces: number;

  @Prop({ default: 0 })
  totalReservation: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);

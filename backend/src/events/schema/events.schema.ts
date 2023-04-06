import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Schema as SchemaType } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, type: Date })
  datetime: Date;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);

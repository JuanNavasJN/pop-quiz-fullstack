import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { EventDocument } from 'src/events/schema/events.schema';
import { UserDocument } from 'src/users/schema/users.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop()
  comment: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true, default: false })
  isDraft: boolean;

  @Prop({ required: true, type: SchemaType.Types.ObjectId, ref: 'User' })
  createdBy: UserDocument;

  @Prop({ required: true, type: SchemaType.Types.ObjectId, ref: 'Event' })
  event: EventDocument;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({ createdBy: 1, event: 1 }, { unique: true });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ADMIN, USER } from 'src/constants';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  passwordResetToken: string;

  @Prop({ require: true, enum: [USER, ADMIN], default: USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

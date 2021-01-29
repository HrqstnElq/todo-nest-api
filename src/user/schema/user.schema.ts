import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  todolist: [{}];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    //khi them user hoac chinh sua password
    if (this.isModified('password')) {
      this['password'] = await Bcrypt.hash(this['password'], 5);
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

UserSchema.static(
  'ComparePassword',
  async function (user: User, password: string) {
    const match = await Bcrypt.compare(password, user.password);

    if (match) return true;
    return false;
  },
);

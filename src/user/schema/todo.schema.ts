import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false, default: false })
  isComplete: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.static('findByUserID', async function (userId: string): Promise<
  Document<Todo>[]
> {
  return this.find({ userId: userId });
});

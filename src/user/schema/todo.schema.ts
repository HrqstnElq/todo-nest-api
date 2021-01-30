import { TodoDto } from './../dto/todo.dto';
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
  try {
    return await this.find({ userId: userId });
  } catch (error) {
    return [];
  }
});
TodoSchema.static('ChangeStateTodo', async function (todoId: string): Promise<{
  message: string;
}> {
  try {
    const todo = (await this.findById(todoId)) as TodoDocument;
    todo.isComplete = !todo.isComplete;
    await todo.save();

    return { message: 'ok' };
  } catch (error) {
    return { message: error.message };
  }
});
TodoSchema.static('EditTodo', async function (todo: TodoDto): Promise<{
  message: string;
}> {
  try {
    const todoTemp = (await this.findById(todo._id)) as TodoDocument;
    todoTemp.content = todo.content;
    await todoTemp.save();

    return { message: 'ok' };
  } catch (error) {
    return { message: error.message };
  }
});

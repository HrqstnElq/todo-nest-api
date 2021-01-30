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
    return [error];
  }
});
TodoSchema.static(
  'UpdateIsCompleteTodo',
  async function (
    todoId: string,
  ): Promise<{
    message: string;
  }> {
    try {
      let _isComplete;
      await this.findById(todoId, function (err, docTodo) {
        if (err) return { message: err };
        _isComplete = docTodo.isComplete;
        docTodo.isComplete = !_isComplete;
        docTodo.save();
      });
      return { message: 'ok' };
    } catch (error) {
      return { message: error };
    }
  },
);
TodoSchema.static(
  'EditTodo',
  async function (
    todoId: string,
    content: string,
  ): Promise<{
    message: string;
  }> {
    try {
      await this.findById(todoId, function (err, docTodo) {
        if (err) return { message: err };
        docTodo.content = content;
        docTodo.save();
      });
      return { message: 'ok' };
    } catch (error) {
      return { message: error };
    }
  },
);
TodoSchema.static('deleteByTodoID', async function (todoId: string): Promise<{
  message: string;
}> {
  try {
    await this.findByIdAndDelete(todoId);
    return { message: 'ok' };
  } catch (error) {
    return { message: error };
  }
});

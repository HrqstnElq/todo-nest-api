import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TodoDto } from './dto/todo.dto';
import { idTodoDto } from './dto/id-todo.dto';
import { editTodoDto } from './dto/edit-todo.dto';
import { LoginResult } from './interface/login-result.interface';
import { UserService } from './user.service';
import { Todo, TodoDocument } from './schema/todo.schema';

@ApiTags('/user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async Register(@Body() register: RegisterDto): Promise<{ message: string }> {
    if (register.password !== register.passwordConfirm)
      return {
        message: 'password and passwordconfirm not match',
      };

    const result = await this.userService.Register(register);

    if (result) return { message: 'register successfully !' };
    else return { message: 'register failed !' };
  }

  @Post('login')
  async Login(@Body() login: LoginDto): Promise<LoginResult> {
    try {
      return this.userService.Login(login);
    } catch (error) {
      return { message: 'Bad request', token: '' };
    }
  }

  @Get('secret')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  GetSecret(@Request() req): any {
    return req.user;
  }

  @Post('todo')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async AddTodo(
    @Request() req,
    @Body() Body: TodoDto,
  ): Promise<{ message: string }> {
    try {
      return this.userService.AddTodo(req.user.userId, Body);
    } catch (error) {
      return { message: 'Add todo failed !' };
    }
  }
  @Get('todo')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async GetTodoList(@Request() req): Promise<TodoDocument[]> {
    try {
      return this.userService.GetTodoList(req.user.userId);
    } catch (error) {
      return;
    }
  }

  @Delete('todo')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async DeleteTodo(@Body() Body: idTodoDto): Promise<{ message: string }> {
    try {
      return this.userService.DeleteTodo(Body.id);
    } catch (error) {
      return { message: 'delete failed !' };
    }
  }

  @Patch('click-todo')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async ClickTodo(@Body() Body: idTodoDto): Promise<{ message: string }> {
    try {
      return this.userService.ClickTodo(Body.id);
    } catch (error) {
      return { message: 'click failed !' };
    }
  }
  @Patch('edit-todo')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async EditTodo(@Body() Body: editTodoDto): Promise<{ message: string }> {
    try {
      return this.userService.EditTodo(Body);
    } catch (error) {
      return { message: 'edit failed !' };
    }
  }
}

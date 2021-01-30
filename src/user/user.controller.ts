/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoDocument } from './schema/todo.schema';
import { LoginResult } from './type/login-result.type';
import { UserService } from './user.service';

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
      throw new BadRequestException(error);
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
      throw new BadRequestException(error);
    }
  }
  @Get('todo-list')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async GetTodoList(@Request() req): Promise<TodoDocument[]> {
    try {
      return this.userService.GetTodoList(req.user.userId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete('todo/:id')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  async DeleteTodo(@Param() params): Promise<{ message: string }> {
    try {
      return this.userService.DeleteTodo(params.id);
    } catch (error) {
      //catch
      throw new BadRequestException(error);
    }
  }

  //change state (isComplete todo item)
  @Put('todo-change-state/:id')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  async ClickTodo(@Param() params): Promise<{ message: string }> {
    try {
      return this.userService.ClickTodo(params.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put('todo')
  @UseGuards(JwtAthGuard)
  @ApiBearerAuth()
  async EditTodo(@Body() Body: TodoDto): Promise<{ message: string }> {
    try {
      return this.userService.EditTodo(Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

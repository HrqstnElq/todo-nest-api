import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResult } from './interface/login-result.interface';
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
    @Body() Body: { content: string },
    @Request() req,
  ): Promise<{ message: string }> {
    try {
      return this.userService.AddTodo(Body.content, req.user.userId);
    } catch (error) {
      return { message: 'Add todo failed !' };
    }
  }
}

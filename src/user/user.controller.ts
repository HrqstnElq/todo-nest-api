import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

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
}

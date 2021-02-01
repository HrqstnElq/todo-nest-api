import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @Matches(new RegExp('^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'), {
    message: 'username not valid',
  })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, {
    message: 'password length must be greater than 6 characters',
  })
  password: string;
}

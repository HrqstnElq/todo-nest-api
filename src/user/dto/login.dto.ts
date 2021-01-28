import { IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'), {
    message: 'username not valid',
  })
  username: string;

  @IsString()
  @MinLength(6, {
    message: 'password length must be greater than 6 characters',
  })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddTodoDto {
  @ApiProperty()
  @IsString()
  userid: string;

  @ApiProperty()
  @IsString()
  todo: string;
}

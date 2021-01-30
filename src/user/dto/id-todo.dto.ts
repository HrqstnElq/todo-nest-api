import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class idTodoDto {
  @ApiProperty()
  @IsString()
  id: string;
}

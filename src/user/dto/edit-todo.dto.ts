import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class editTodoDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty({ required: false })
  _id?: string;

  @ApiProperty({ required: false })
  @IsString()
  content: string;
}

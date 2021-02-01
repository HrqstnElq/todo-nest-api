import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty({ required: false })
  @Allow()
  _id: any;

  @ApiProperty({ required: false })
  @IsString()
  content: string;
}

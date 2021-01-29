import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty()
  content: string;
}

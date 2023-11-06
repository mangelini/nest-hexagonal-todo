import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';
import { TodoStatus } from '../domain/todo.types';

export class TodoResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'Grocery todo',
    description: 'Todo title',
  })
  title: string;

  @ApiProperty({
    example: 'Eggs, Tomatoes, Bread',
    description: 'Todo description',
  })
  description: string;

  @ApiProperty({
    example: 'active',
    description: 'A Todo status can be either active, completed or archived',
  })
  status: TodoStatus;
}

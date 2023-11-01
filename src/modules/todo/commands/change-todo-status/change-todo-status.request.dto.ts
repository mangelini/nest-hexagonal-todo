import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../../domain/todo.types';

export class ChangeTodoStatusRequestDTO {
  @ApiProperty({
    example: '753f6861-9391-4f2e-89cf-21093b6aebc3',
    description: 'Todo id',
  })
  @IsString()
  readonly todoId: string;

  @ApiProperty({
    example: 'active',
    description: 'A Todo status can be either active, completed or archived',
  })
  @IsEnum(TodoStatus, {
    message:
      'Invalid status value. Valid values are active, completed, or archived.',
  })
  status: TodoStatus;
}

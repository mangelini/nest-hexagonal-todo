import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../../domain/todo.types';

export class ChangeTodoStatusRequestDTO {
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

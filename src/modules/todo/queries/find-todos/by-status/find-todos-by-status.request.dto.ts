import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '@src/modules/todo/domain/todo.types';
import { IsEnum, IsString } from 'class-validator';

export class FindTodosByStatusRequestDto {
  @ApiProperty({
    example: '753f6861-9391-4f2e-89cf-21093b6aebc3',
    description: 'User id',
  })
  @IsString()
  readonly userId: string;

  @ApiProperty({
    example: 'active',
    description: 'A Todo status can be either active, completed or archived',
    required: false,
  })
  @IsEnum(TodoStatus, {
    message:
      'Invalid status value. Valid values are active, completed, or archived.',
  })
  status: TodoStatus;
}

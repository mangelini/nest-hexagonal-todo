import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../../domain/todo.types';

export class UpdateTodoDescriptionCommandDto {
  @ApiProperty({
    example: '753f6861-9391-4f2e-89cf-21093b6aebc3',
    description: 'Todo id',
  })
  @IsString()
  @IsNotEmpty()
  readonly todoId: string;

  @ApiProperty({
    example: 'Groceries',
    description: 'Todo title',
  })
  @IsString()
  readonly title?: string;

  @ApiProperty({
    example: 'Bread, bananas, tomatoes',
    description: 'Todo description',
  })
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: 'active',
    description: 'A Todo status can be either active, completed or archived',
    required: false,
  })
  @IsEnum(TodoStatus, {
    message:
      'Invalid status value. Valid values are active, completed, or archived.',
  })
  status?: TodoStatus;
}

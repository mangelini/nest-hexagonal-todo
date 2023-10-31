import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoTitleCommandDto {
  @ApiProperty({
    example: 'Groceries todo',
    description: 'Todo title',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

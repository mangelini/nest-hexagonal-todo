import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDescriptionCommandDto {
  @ApiProperty({
    example: 'Bread, bananas, tomatoes',
    description: 'Todo description',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoRequestDto {
  @ApiProperty({
    example: 'Groceries todo',
    description: 'Todo title',
  })
  @MaxLength(320)
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Bread, Bananas, Tomatoes',
    description: 'Todo title',
  })
  @MaxLength(320)
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: '753f6861-9391-4f2e-89cf-21093b6aebc3',
    description: 'User id',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindTodosByUserRequestDto {
  @ApiProperty({
    example: '753f6861-9391-4f2e-89cf-21093b6aebc3',
    description: 'User id',
  })
  @IsString()
  readonly userId: string;
}

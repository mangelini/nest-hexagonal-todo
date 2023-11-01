import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTodosByUserRequestDto {
  @ApiProperty({
    example: '753f6861-9391-4f2e-89cf-21093b6aebc3',
    description: 'User id',
  })
  @IsOptional()
  @IsString()
  readonly userId?: string;
}

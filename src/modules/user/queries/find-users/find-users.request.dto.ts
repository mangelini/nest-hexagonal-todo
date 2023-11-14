import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUsersRequestDto {
  @ApiProperty({ example: 'some-complex-string', description: 'User id' })
  @IsString()
  @IsOptional()
  readonly id?: string;
}

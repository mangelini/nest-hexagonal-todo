import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'johnnyUsr',
    description: 'Username',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsString()
  readonly username: string;
}

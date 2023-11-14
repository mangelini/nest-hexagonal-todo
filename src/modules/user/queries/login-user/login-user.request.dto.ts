import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({ example: 'johnnyUsr', description: 'User username' })
  @IsString()
  readonly username: string;
}

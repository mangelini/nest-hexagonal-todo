import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'johnnyUsr',
    description: "User's username",
  })
  username: string;
}

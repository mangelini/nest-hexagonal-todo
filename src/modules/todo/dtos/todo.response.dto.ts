import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@libs/api/response.base';

export class TodoResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'Grocery todo',
    description: 'Todo title',
  })
  title: string;

  @ApiProperty({
    example: 'Eggs, Tomatoes, Bread',
    description: 'Todo description',
  })
  description: string;
}

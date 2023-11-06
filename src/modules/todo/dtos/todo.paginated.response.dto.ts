import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@src/libs/api/paginated.response.base';
import { TodoResponseDto } from './todo.response.dto';

export class TodoPaginatedResponseDto extends PaginatedResponseDto<TodoResponseDto> {
  @ApiProperty({ type: TodoResponseDto, isArray: true })
  readonly data: readonly TodoResponseDto[];
}

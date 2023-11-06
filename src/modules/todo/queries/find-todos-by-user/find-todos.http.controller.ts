import { Body, Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { Paginated } from '@src/libs/ddd';
import { PaginatedQueryRequestDto } from '@src/libs/api/paginated-query.request.dto';
import { ResponseBase } from '@src/libs/api/response.base';
import { TodoPaginatedResponseDto } from '../../dtos/todo.paginated.response.dto';
import { FindTodosByUserRequestDto } from './find-todos-by-user.request.dto';
import { FindTodosByUserQuery } from './find-todos-by-user.query-handler';
import { TodoModel } from '../../database/todo.repository';

@Controller(routesV1.version)
export class FindTodosHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.todo.root)
  @ApiOperation({ summary: 'Find todos by user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TodoPaginatedResponseDto,
  })
  async findTodos(
    @Body() request: FindTodosByUserRequestDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<TodoPaginatedResponseDto> {
    const query = new FindTodosByUserQuery({
      ...request,
      limit: queryParams?.limit,
      page: queryParams?.page,
    });
    const result: Result<
      Paginated<TodoModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties
    return new TodoPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((todo) => ({
        ...new ResponseBase({
          id: todo.id,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        }),
        title: todo.title,
        description: todo.description,
        status: todo.status,
      })),
    });
  }
}

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { Paginated } from '@src/libs/ddd';
import { PaginatedQueryRequestDto } from '@src/libs/api/paginated-query.request.dto';
import { ResponseBase } from '@src/libs/api/response.base';
import { TodoPaginatedResponseDto } from '../../dtos/todo.paginated.response.dto';
import { FindTodosByUserRequestDto } from './by-user/find-todos-by-user.request.dto';
import { FindTodosByUserQuery } from './by-user/find-todos-by-user.query-handler';
import { TodoModel } from '../../database/todo.repository';
import { FindTodosByStatusQuery } from './by-status/find-todos-by-status.query-handler';
import { FindTodosByStatusRequestDto } from './by-status/find-todos-by-status.request.dto';
import { JwtAuthGuard } from '@src/modules/auth/jwt-auth.guard';

@Controller(routesV1.version)
export class FindTodosHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Find todos by user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TodoPaginatedResponseDto,
  })
  @Post(routesV1.todo.findByUser)
  @UseGuards(JwtAuthGuard)
  async findTodosByUser(
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

  @ApiResponse({
    status: HttpStatus.OK,
    type: TodoPaginatedResponseDto,
  })
  @Post(routesV1.todo.findByStatus)
  @UseGuards(JwtAuthGuard)
  async findByStatus(
    @Body() request: FindTodosByStatusRequestDto,
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<TodoPaginatedResponseDto> {
    const query = new FindTodosByStatusQuery({
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

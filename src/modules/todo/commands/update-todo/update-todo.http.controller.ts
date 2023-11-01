import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { AggregateID } from '@libs/ddd';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { UpdateTodoTitleCommandDto } from './update-todo-title.request.dto';
import { UpdateTodoTitleCommand } from './update-todo-title.command';
import { UpdateTodoDescriptionCommand } from './update-todo-desc.command';
import { UpdateTodoDescriptionCommandDto } from './update-todo-desc.request.dto';

@Controller(routesV1.version)
export class UpdateTodoHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update a todo title' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.todo.updateTitle)
  async updateTitle(
    @Body() body: UpdateTodoTitleCommandDto,
  ): Promise<IdResponse> {
    const command = new UpdateTodoTitleCommand(body);

    const result: Result<AggregateID, Error> = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        throw error;
      },
    });
  }

  @ApiOperation({ summary: 'Update a todo description' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.todo.updateDescription)
  async updateDescription(
    @Body() body: UpdateTodoDescriptionCommandDto,
  ): Promise<IdResponse> {
    const command = new UpdateTodoDescriptionCommand(body);

    const result: Result<AggregateID, Error> = await this.commandBus.execute(
      command,
    );

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        throw error;
      },
    });
  }
}

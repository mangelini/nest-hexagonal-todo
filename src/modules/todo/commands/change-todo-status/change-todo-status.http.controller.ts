import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { AggregateID } from '@libs/ddd';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { TodoStatusValidationPipe } from './todo-status-validation.pipe';
import { ChangeTodoStatusRequestDTO } from './change-todo-status.request.dto';
import { ChangeTodoStatusCommand } from './change-todo-status.service';

@Controller(routesV1.version)
export class ChangeTodoStatusHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Change a todo status' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.todo.changeStatus)
  async changeStatus(
    @Param('id') todoId: string,
    @Body(new TodoStatusValidationPipe()) body: ChangeTodoStatusRequestDTO,
  ): Promise<IdResponse> {
    const command = new ChangeTodoStatusCommand({
      todoId: todoId,
      status: body.status,
    });

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

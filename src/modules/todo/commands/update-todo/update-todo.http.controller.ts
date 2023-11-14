import { Body, Controller, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { match, Result } from 'oxide.ts';
import { IdResponse } from '@libs/api/id.response.dto';
import { AggregateID } from '@libs/ddd';
import { ApiErrorResponse } from '@src/libs/api/api-error.response';
import { UpdateTodoCommand } from './update-todo.command';
import { TodoStatusValidationPipe } from './todo-status-validation.pipe';
import { UpdateTodoRequestDto } from './update-todo.request.dto';
import { JwtAuthGuard } from '@src/modules/auth/jwt-auth.guard';

@Controller(routesV1.version)
export class UpdateTodoHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Update a todo title, description or status' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Patch(routesV1.todo.root)
  @UseGuards(JwtAuthGuard)
  async update(
    @Body(new TodoStatusValidationPipe()) body: UpdateTodoRequestDto,
  ): Promise<IdResponse> {
    const command = new UpdateTodoCommand(body);

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

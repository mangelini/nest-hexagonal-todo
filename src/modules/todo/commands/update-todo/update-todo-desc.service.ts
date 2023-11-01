import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { TODO_REPOSITORY } from '../../todo.di-tokens';
import { TodoRepositoryPort } from '../../database/todo.repository.port';
import { AggregateID } from '@src/libs/ddd';

export class UpdateTodoDescriptionCommand {
  readonly todoId: string;
  readonly description: string;

  constructor(props: UpdateTodoDescriptionCommand) {
    this.todoId = props.todoId;
    this.description = props.description;
  }
}

@CommandHandler(UpdateTodoDescriptionCommand)
export class UpdateTodoDescriptionService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepo: TodoRepositoryPort,
  ) {}

  async execute(
    command: UpdateTodoDescriptionCommand,
  ): Promise<Result<AggregateID, NotFoundException>> {
    try {
      await this.todoRepo.updateDescription(
        command.todoId,
        command.description,
      );
      return Ok(command.todoId);
    } catch (error: any) {
      throw error;
    }
  }
}

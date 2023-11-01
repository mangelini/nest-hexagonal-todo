import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TODO_REPOSITORY } from '../../todo.di-tokens';
import { TodoRepositoryPort } from '../../database/todo.repository.port';
import { Ok, Result } from 'oxide.ts';
import { TodoStatus } from '../../domain/todo.types';
import { AggregateID } from '@src/libs/ddd';

export class ChangeTodoStatusCommand {
  readonly todoId: string;
  readonly status: TodoStatus;

  constructor(props: ChangeTodoStatusCommand) {
    this.todoId = props.todoId;
    this.status = props.status;
  }
}

@CommandHandler(ChangeTodoStatusCommand)
export class ChangeTodoStatusService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepo: TodoRepositoryPort,
  ) {}

  async execute(
    command: ChangeTodoStatusCommand,
  ): Promise<Result<AggregateID, NotFoundException>> {
    try {
      await this.todoRepo.changeStatus(command.todoId, command.status);
      return Ok(command.todoId);
    } catch (error: any) {
      throw error;
    }
  }
}

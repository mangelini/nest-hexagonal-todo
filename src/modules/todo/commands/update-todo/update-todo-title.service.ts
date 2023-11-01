import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { TODO_REPOSITORY } from '../../todo.di-tokens';
import { TodoRepositoryPort } from '../../database/todo.repository.port';
import { AggregateID } from '@src/libs/ddd';

export class UpdateTodoTitleCommand {
  readonly todoId: string;
  readonly title: string;

  constructor(props: UpdateTodoTitleCommand) {
    this.todoId = props.todoId;
    this.title = props.title;
  }
}

@CommandHandler(UpdateTodoTitleCommand)
export class UpdateTodoTitleService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepo: TodoRepositoryPort,
  ) {}

  async execute(
    command: UpdateTodoTitleCommand,
  ): Promise<Result<AggregateID, NotFoundException>> {
    try {
      await this.todoRepo.updateTitle(command.todoId, command.title);
      return Ok(command.todoId);
    } catch (error: any) {
      throw error;
    }
  }
}

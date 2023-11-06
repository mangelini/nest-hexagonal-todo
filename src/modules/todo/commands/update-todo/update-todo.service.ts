import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { TODO_REPOSITORY } from '../../todo.di-tokens';
import { TodoRepositoryPort } from '../../database/todo.repository.port';
import { AggregateID } from '@src/libs/ddd';
import { UpdateTodoCommand } from './update-todo.command';
import { TodoEntity } from '../../domain/todo.entity';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepo: TodoRepositoryPort,
  ) {}

  async execute(
    command: UpdateTodoCommand,
  ): Promise<Result<AggregateID, NotFoundException>> {
    const todo: TodoEntity = (
      await this.todoRepo.findOneById(command.todoId)
    ).unwrap();

    if (!todo) {
      throw new NotFoundException(`Todo with id ${command.todoId} not found`);
    }

    if (command.title) {
      todo.updateTitle(command.title);
    }
    if (command.description) {
      todo.updateDescription(command.description);
    }
    if (command.status) {
      todo.updateStatus(command.status);
    }

    await this.todoRepo.transaction(async () =>
      this.todoRepo.updateTodo({
        todoId: command.todoId,
        title: command.title,
        description: command.description,
        status: command.status,
      }),
    );
    return Ok(command.todoId);
  }
}

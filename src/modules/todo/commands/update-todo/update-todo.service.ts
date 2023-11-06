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
    try {
      const oldTodo: TodoEntity = (
        await this.todoRepo.findOneById(command.todoId)
      ).unwrap();
      if (command.title) {
        oldTodo.updateTitle(command.title);
      }
      if (command.description) {
        oldTodo.updateDescription(command.description);
      }
      if (command.status) {
        oldTodo.updateStatus(command.status);
      }
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
    return Ok(command.todoId);
  }
}

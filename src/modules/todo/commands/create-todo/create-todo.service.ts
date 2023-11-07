import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { Inject } from '@nestjs/common';
import { CreateTodoCommand } from './create-todo.command';
import { TODO_REPOSITORY } from '../../todo.di-tokens';
import { TodoRepositoryPort } from '../../database/todo.repository.port';
import { TodoEntity } from '../../domain/todo.entity';

@CommandHandler(CreateTodoCommand)
export class CreateTodoService implements ICommandHandler {
  constructor(
    @Inject(TODO_REPOSITORY)
    protected readonly todoRepo: TodoRepositoryPort,
  ) {}

  async execute(
    command: CreateTodoCommand,
  ): Promise<Result<AggregateID, Error>> {
    const todo = TodoEntity.create({
      title: command.title,
      description: command.description,
      userId: command.userId,
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.todoRepo.transaction(async () => this.todoRepo.insert(todo));
      return Ok(todo.id);
    } catch (error: any) {
      throw error;
    }
  }
}

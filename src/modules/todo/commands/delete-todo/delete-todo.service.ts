import { NotFoundException } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { TODO_REPOSITORY } from '../../todo.di-tokens';
import { TodoRepositoryPort } from '../../database/todo.repository.port';

export class DeleteTodoCommand {
  readonly id: string;

  constructor(props: DeleteTodoCommand) {
    this.id = props.id;
  }
}

@CommandHandler(DeleteTodoCommand)
export class DeleteUserService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepo: TodoRepositoryPort,
  ) {}

  async execute(
    command: DeleteTodoCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.todoRepo.findOneById(command.id);
    if (found.isNone()) return Err(new NotFoundException());
    const todo = found.unwrap();
    todo.delete();
    const result = await this.todoRepo.delete(todo);
    return Ok(result);
  }
}

import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoMapper } from './todo.mapper';
import { TODO_REPOSITORY } from './todo.di-tokens';
import { TodoRepository } from './database/todo.repository';
import { CreateTodoHttpController } from './commands/create-todo/create-todo.http.controller';
import { DeleteTodoHttpController } from './commands/delete-todo/delete-todo.http.controller';
import { UpdateTodoHttpController } from './commands/update-todo/update-todo.http.controller';
import { CreateTodoService } from './commands/create-todo/create-todo.service';
import { DeleteTodoService } from './commands/delete-todo/delete-todo.service';
import { UpdateTodoService } from './commands/update-todo/update-todo.service';
import { FindTodosByUserQueryHandler } from './queries/find-todos/by-user/find-todos-by-user.query-handler';
import { FindTodosHttpController } from './queries/find-todos/find-todos.http.controller';
import { FindTodosByStatusQueryHandler } from './queries/find-todos/by-status/find-todos-by-status.query-handler';
import { AuthModule } from '../auth/auth.module';

const httpControllers = [
  CreateTodoHttpController,
  DeleteTodoHttpController,
  UpdateTodoHttpController,
  FindTodosHttpController,
];

const commandHandlers: Provider[] = [
  CreateTodoService,
  DeleteTodoService,
  UpdateTodoService,
];

const queryHandlers: Provider[] = [
  FindTodosByUserQueryHandler,
  FindTodosByStatusQueryHandler,
];

const mappers: Provider[] = [TodoMapper];

const repositories: Provider[] = [
  { provide: TODO_REPOSITORY, useClass: TodoRepository },
];

@Module({
  imports: [CqrsModule, AuthModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...mappers,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class TodoModule {}

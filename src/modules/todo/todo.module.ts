import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoMapper } from './todo.mapper';
import { TODO_REPOSITORY } from './todo.di-tokens';
import { TodoRepository } from './database/todo.repository';

const mappers: Provider[] = [TodoMapper];

const repositories: Provider[] = [
  { provide: TODO_REPOSITORY, useClass: TodoRepository },
];

@Module({
  imports: [CqrsModule],
  providers: [Logger, ...repositories, ...mappers],
})
export class TodoModule {}

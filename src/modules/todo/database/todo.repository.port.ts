import { RepositoryPort } from '@libs/ddd';
import { TodoEntity } from '../domain/todo.entity';
import { TodoStatus } from '../domain/todo.types';

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> {
  findByUser(userId: string): Promise<TodoEntity[] | null>;
  updateTitle(todoId: string, title: string): Promise<void>;
  updateDescription(todoId: string, description: string): Promise<void>;
  changeStatus(todoId: string, status: TodoStatus): Promise<void>;
}

import { RepositoryPort } from '@libs/ddd';
import { TodoEntity } from '../domain/todo.entity';

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> {
  findByUser(userId: string): Promise<TodoEntity[] | null>;
  updateTitle(todoId: string, title: string): Promise<void>;
  updateDescription(todoId: string, description: string): Promise<void>;
}

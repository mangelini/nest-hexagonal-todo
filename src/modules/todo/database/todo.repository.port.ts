import { RepositoryPort } from '@libs/ddd';
import { TodoEntity } from '../domain/todo.entity';

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> {
  findByUser(userId: string): Promise<TodoEntity | null>;
}

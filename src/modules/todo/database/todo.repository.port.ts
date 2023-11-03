import { RepositoryPort } from '@libs/ddd';
import { TodoEntity } from '../domain/todo.entity';
import { UpdateTodoProps } from '../domain/todo.types';

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> {
  findByUser(userId: string): Promise<TodoEntity[] | null>;
  updateTodo(todo: UpdateTodoProps): Promise<void>;
}

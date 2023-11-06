import { SqlRepositoryBase } from '@src/libs/db/sql-repository.base';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { TodoProps, TodoStatus, UpdateTodoProps } from '../domain/todo.types';
import { TodoEntity } from '../domain/todo.entity';
import { TodoRepositoryPort } from './todo.repository.port';
import { TodoMapper } from '../todo.mapper';

export const todoSchema = z.object({
  id: z.string().min(1).max(255),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(TodoStatus),
  userId: z.string().min(1).max(255),
});

export type TodoModel = z.TypeOf<typeof todoSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class TodoRepository
  extends SqlRepositoryBase<TodoEntity, TodoModel>
  implements TodoRepositoryPort
{
  protected tableName = 'todos';

  protected schema = todoSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: TodoMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(TodoRepository.name));
  }

  async findByUser(userId: string): Promise<TodoEntity[]> {
    const records = await this.pool.many(
      sql.type(todoSchema)`SELECT * FROM "todos" WHERE userId = ${userId}`,
    );

    const todos: TodoEntity[] = records.map((record) =>
      this.mapper.toDomain(record),
    );
    return todos;
  }

  async updateTodo(props: UpdateTodoProps): Promise<void> {
    const statement = sql`
      UPDATE "todos"
      SET
        ${props.title ? sql`title = ${props.title},` : sql``}
        ${props.description ? sql`description = ${props.description},` : sql``}
        ${props.status ? sql`status = ${props.status},` : sql``}
        updated_at = NOW()
      WHERE id = ${props.todoId}
    `;

    await this.pool.query(statement);
  }
}

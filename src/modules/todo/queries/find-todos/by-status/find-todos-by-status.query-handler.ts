import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';
import { Paginated } from '@src/libs/ddd';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { TodoModel, todoSchema } from '../../../database/todo.repository';
import { TodoStatus } from '@src/modules/todo/domain/todo.types';

export class FindTodosByStatusQuery extends PaginatedQueryBase {
  readonly userId: string;
  readonly status: TodoStatus;

  constructor(props: PaginatedParams<FindTodosByStatusQuery>) {
    super(props);
    this.userId = props.userId;
    this.status = props.status;
  }
}

@QueryHandler(FindTodosByStatusQuery)
export class FindTodosByStatusQueryHandler implements IQueryHandler {
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  async execute(
    query: FindTodosByStatusQuery,
  ): Promise<Result<Paginated<TodoModel>, Error>> {
    const statement = sql.type(todoSchema)`
         SELECT *
         FROM todos
         WHERE "userId"=${query.userId} AND "status"=${query.status}
         LIMIT ${query.limit}
         OFFSET ${query.offset}`;

    const records = await this.pool.query(statement);

    return Ok(
      new Paginated({
        data: records.rows,
        count: records.rowCount,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}

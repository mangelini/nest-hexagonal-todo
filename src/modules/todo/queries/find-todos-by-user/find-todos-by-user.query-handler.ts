import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';
import { Paginated } from '@src/libs/ddd';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { TodoModel, todoSchema } from '../../database/todo.repository';

export class FindTodosByUserQuery extends PaginatedQueryBase {
  readonly userId?: string;

  constructor(props: PaginatedParams<FindTodosByUserQuery>) {
    super(props);
    this.userId = props.userId;
  }
}

@QueryHandler(FindTodosByUserQuery)
export class FindTodosByUserQueryHandler implements IQueryHandler {
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  async execute(
    query: FindTodosByUserQuery,
  ): Promise<Result<Paginated<TodoModel>, Error>> {
    //TODO do dynamic query like in user
    const statement = sql.type(todoSchema)`
         SELECT *
         FROM todos
         WHERE
           ${query.userId ? sql`userId = ${query.userId}` : true}
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

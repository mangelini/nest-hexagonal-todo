import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@libs/ddd/query.base';
import { Paginated } from '@src/libs/ddd';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { UserModel, userSchema } from '../../database/user.repository';

export class FindUsersQuery extends PaginatedQueryBase {
  readonly id?: number;

  readonly uuid?: string;

  readonly username?: string;

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props);
    this.id = props.id;
    this.uuid = props.uuid;
    this.username = props.username;
  }
}

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindUsersQuery,
  ): Promise<Result<Paginated<UserModel>, Error>> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(userSchema)`
         SELECT *
         FROM users
         WHERE
           ${query.id ? sql`id = ${query.id}` : true} AND
           ${query.uuid ? sql`uuid = ${query.uuid}` : true} AND
           ${query.username ? sql`"username" = ${query.username}` : true}
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

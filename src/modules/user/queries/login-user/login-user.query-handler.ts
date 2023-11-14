import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { userSchema } from '../../database/user.repository';
import { LoginAccess, LoginUserPayload } from '../../domain/user.types';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from '@src/modules/auth/auth.service';

export class LoginUserQuery {
  readonly username: string;

  constructor(props: LoginUserQuery) {
    this.username = props.username;
  }
}

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler implements IQueryHandler {
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
    private readonly authService: AuthService,
  ) {}

  async execute(query: LoginUserQuery): Promise<Result<LoginAccess, Error>> {
    const statement = sql.type(userSchema)`
         SELECT *
         FROM users
         WHERE
           ${query.username ? sql`"username" = ${query.username}` : true}`;

    const records = await this.pool.query(statement);

    if (records.rowCount === 0) {
      throw new NotFoundException(
        `User with username ${query.username} not found`,
      );
    }

    if (records.rowCount > 1) {
      throw new Error(`Multiple users found with username ${query.username}`);
    }

    const { id, username } = records.rows[0];

    const payload: LoginUserPayload = { id, username };

    const tokenObj = await this.authService.login(payload);

    const loginAccess: LoginAccess = {
      access_token: tokenObj.access_token,
      id,
    };

    return Ok(loginAccess);
  }
}

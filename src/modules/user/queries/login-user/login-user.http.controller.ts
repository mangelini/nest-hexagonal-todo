import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Result } from 'oxide.ts';
import { LoginUserRequestDto } from './login-user.request.dto';
import { LoginUserQuery } from './login-user.query-handler';
import { LoginAccess } from '../../domain/user.types';
import { Response } from 'express';

@Controller(routesV1.version)
export class LoginUserHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post(routesV1.user.login)
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async login(
    @Body() request: LoginUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const query = new LoginUserQuery({
      ...request,
    });
    const result: Result<LoginAccess, Error> = await this.queryBus.execute(
      query,
    );

    const loginAccess = result.unwrap();

    res
      .cookie('access_token', loginAccess.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 30 * 24 * 60 * 1000),
      })
      .send({ status: 'ok', userId: loginAccess.id });
  }
}

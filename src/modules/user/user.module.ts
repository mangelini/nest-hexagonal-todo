import { Logger, Module, Provider } from '@nestjs/common';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { DeleteUserHttpController } from './commands/delete-user/delete-user.http.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { DeleteUserService } from './commands/delete-user/delete-user.service';
import { UserMapper } from './user.mapper';
import { USER_REPOSITORY } from './user.di-tokens';
import { UserRepository } from './database/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { FindUsersHttpController } from './queries/find-users/find-users.http.controller';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  FindUsersHttpController,
];

const commandHandlers: Provider[] = [CreateUserService, DeleteUserService];

const queryHandlers: Provider[] = [FindUsersQueryHandler];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule {}

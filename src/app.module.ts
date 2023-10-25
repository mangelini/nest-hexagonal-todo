import { Module } from '@nestjs/common';
import {
  databaseConfig,
  postgresConnectionUri,
} from './configs/database.config';
import { UserModule } from './user/user.module';
import postgres from 'postgres';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async () => {
        const sql = postgres(postgresConnectionUri, databaseConfig);
        return sql;
      },
    },
    ...interceptors,
  ],
})
export class AppModule {}

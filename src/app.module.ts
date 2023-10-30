import { Module } from '@nestjs/common';
import { postgresConnectionUri } from './configs/database.config';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { SlonikModule } from 'nestjs-slonik';

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
  imports: [
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}

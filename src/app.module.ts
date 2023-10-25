import { Module } from '@nestjs/common';
import {
  databaseConfig,
  postgresConnectionUri,
} from './configs/database.config';
import postgres from 'postgres';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'PG_CONNECTION',
      useFactory: async () => {
        const sql = postgres(postgresConnectionUri, databaseConfig);
        return sql;
      },
    },
  ],
})
export class AppModule {}

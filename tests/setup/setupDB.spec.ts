// Setting up test server and utilities

import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import postgres, { PostgresType, Sql } from 'postgres';
import { AppModule } from 'src/app.module';
import {
  databaseConfig,
  postgresConnectionUri,
} from 'src/configs/database.config';

export class TestServer {
  constructor(
    public readonly serverApplication: NestExpressApplication,
    public readonly testingModule: TestingModule,
  ) {}

  public static async new(
    testingModuleBuilder: TestingModuleBuilder,
  ): Promise<TestServer> {
    const testingModule: TestingModule = await testingModuleBuilder.compile();

    const app: NestExpressApplication = testingModule.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

    app.enableShutdownHooks();

    await app.init();

    return new TestServer(app, testingModule);
  }
}

let testServer: TestServer;
let dbClient: Sql;

export async function generateTestingApplication(): Promise<{
  testServer: TestServer;
}> {
  const testServer = await TestServer.new(
    Test.createTestingModule({
      imports: [AppModule],
    }),
  );

  return {
    testServer,
  };
}

export function getTestServer(): TestServer {
  return testServer;
}

export function getConnectionPool(): Sql {
  return dbClient;
}

// setup
beforeAll(async (): Promise<void> => {
  ({ testServer } = await generateTestingApplication());
  dbClient = postgres(postgresConnectionUri, databaseConfig);
  await dbClient`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_name = ${databaseConfig.database}
    AND table_name = 'users';`;
});

// cleanup
afterAll(async (): Promise<void> => {
  testServer.serverApplication.close();
});

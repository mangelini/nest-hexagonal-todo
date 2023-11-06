CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "uuid" character varying UNIQUE NOT NULL,
  "username" character varying UNIQUE NOT NULL,
  "role" character varying NOT NULL
);

CREATE TABLE "todos" (
  "id" character varying PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "userId" character varying REFERENCES users(uuid) ON DELETE CASCADE,
  "title" character varying NOT NULL,
  "description" character varying NOT NULL,
  "status" character varying NOT NULL,
  CONSTRAINT check_status CHECK (status IN ('active', 'archived', 'completed'))
);
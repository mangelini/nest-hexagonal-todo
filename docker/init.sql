CREATE TABLE "users" (
  "id" character varying PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "username" character varying UNIQUE NOT NULL,
  "role" character varying NOT NULL
);

CREATE TABLE "todos" (
  "id" character varying PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "userId" character varying REFERENCES users(id) ON DELETE CASCADE,
  "title" character varying NOT NULL,
  "description" character varying NOT NULL,
  "status" character varying NOT NULL,
  CONSTRAINT check_status CHECK (status IN ('active', 'archived', 'completed'))
);
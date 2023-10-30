CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "uuid" character varying UNIQUE NOT NULL,
  "username" character varying UNIQUE NOT NULL,
  "role" character varying NOT NULL
);

CREATE TABLE "todos" (
  "id" serial PRIMARY KEY,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "title" character varying NOT NULL,
  "description" TEXT,
  "completed" BOOLEAN DEFAULT FALSE
);
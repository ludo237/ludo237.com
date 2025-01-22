import {
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const sudokusTable = pgTable('sudoku', {
  id: serial('id').primaryKey(),
  time: integer('time').notNull(),
  moves: integer('moves').notNull(),
  difficulty: varchar('difficulty').notNull(),
  userId: uuid('user_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

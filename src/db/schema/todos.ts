import { pgTable, uuid, varchar, text, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';
import { users } from './users';

export const todoStatusEnum = pgEnum('todo_status', [
  'to do',
  'to complete',
  'finished',
]);

export const todos = pgTable('todos', {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 256 }).notNull(),
  description: text().notNull(),
  status: todoStatusEnum().default(todoStatusEnum.enumValues[0]).notNull(),
  ...timestamps,
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
});


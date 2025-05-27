import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';

export const users = pgTable('users', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text(),
  ...timestamps,
});


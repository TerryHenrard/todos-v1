import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';

export const verifications = pgTable('verifications', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ...timestamps,
});


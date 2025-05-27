import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { timestamps } from '../columns.helpers';
import { users } from './users';

export const sessions = pgTable('sessions', {
  id: text().primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text().notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...timestamps,
});


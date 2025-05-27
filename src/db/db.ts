import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/neon-http';

// Custom logger for more control (only in development)
const customLogger =
  process.env.NODE_ENV === 'development'
    ? {
        logQuery: (query: string, params: unknown[]) => {
          console.log('🔍 SQL Query:', query);
          console.log('📊 Parameters:', params);
          console.log('---');
        },
      }
    : false;

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
  logger: customLogger,
});

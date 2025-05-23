import { db } from '@/db';
import { accounts, sessions, users, verifications } from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // in seconds
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      account: accounts,
      verification: verifications,
      session: sessions,
    },
  }),
  plugins: [nextCookies()],
  emailAndPassword: { enabled: true },
});

export type Session = typeof auth.$Infer.Session;


import { db } from '@/db';
import { accounts, sessions, users, verifications } from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
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
  // socialProviders: {
  //   github: {
  //     clientId: '' as string,
  //     clientSecret: '' as string,
  //   },
  // },
});

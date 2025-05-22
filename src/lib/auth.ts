import { db } from '@/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  plugins: [nextCookies()],
  emailAndPassword: { enabled: true },
  // socialProviders: {
  //   github: {
  //     clientId: '' as string,
  //     clientSecret: '' as string,
  //   },
  // },
});

/* eslint-disable */
// @ts-nocheck

import { db } from '.';
import { usersTable } from './schema';
import { faker } from '@faker-js/faker';

async function main() {
  const usersToInsert: (typeof usersTable.$inferInsert)[] = [];

  for (let i = 0; i < 5; i++) {
    usersToInsert.push({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 80 }),
      email: faker.internet.email(),
    });
  }

  await db.insert(usersTable).values(usersToInsert);
  console.log('Users inserted!');

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
}

main();

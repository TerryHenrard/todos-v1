'use server';

import { db } from '@/db/db';
import { todos } from '@/db/schema';

export const getTodosByUserId = async (userId: string) => {
  return await db.query.todos.findMany({
    columns: {
      userId: false,
    },
    where: (todos, { eq }) => eq(todos.userId, userId),
  });
};

type newTodo = typeof todos.$inferInsert;
export const insertTodo = async (todo: newTodo) => {
  return db.insert(todos).values(todo);
};


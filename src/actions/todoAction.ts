'use server';

import { db } from '@/db/db';
import { todos } from '@/db/schema';
import { eq, InferSelectModel } from 'drizzle-orm';

export const getTodosByUserId = async (
  userId: InferSelectModel<typeof todos>['userId']
) => {
  try {
    const todos = await db.query.todos.findMany({
      where: (todos, { eq }) => eq(todos.userId, userId),
    });
    return {
      message: "To do\'s retrieved successfully",
      isSuccess: true,
      todos,
    };
  } catch {
    return { message: "Failed to retrieve to do's", isSuccess: false };
  }
};

export const deleteTodo = async (id: InferSelectModel<typeof todos>['id']) => {
  try {
    await db.delete(todos).where(eq(todos.id, id));
    return { message: 'To do deleted successfully', isSuccess: true };
  } catch {
    return { message: 'Failed to delete to do', isSuccess: false };
  }
};


'use server';

import { db } from '@/db/db';
import { todos } from '@/db/schema';
import { InsertTodo, UpdateTodo } from '@/types';
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
    const { rowCount } = await db.delete(todos).where(eq(todos.id, id));
    return { message: 'To do deleted successfully', isSuccess: rowCount > 0 };
  } catch {
    return { message: 'Failed to delete to do', isSuccess: false };
  }
};

export const insertTodo = async (todo: InsertTodo) => {
  try {
    const { rowCount } = await db.insert(todos).values(todo);
    return { message: 'To do inserted successfully', isSuccess: rowCount > 0 };
  } catch {
    return { message: 'Failed to insert to do', isSuccess: false };
  }
};

export const updateTodo = async (todo: UpdateTodo) => {
  try {
    const { rowCount } = await db
      .update(todos)
      .set({
        title: todo.title,
        description: todo.description,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, todo.id));
    return { message: 'To do updated successfully', isSuccess: rowCount > 0 };
  } catch {
    return { message: 'Failed to update to do', isSuccess: false };
  }
};

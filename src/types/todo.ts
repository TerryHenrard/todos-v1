import { todos } from '@/db/schema';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Base Todo type from database schema
export type Todo = InferSelectModel<typeof todos>;
export type InsertTodo = InferInsertModel<typeof todos>;

// Component-specific types
export type TodoCardData = Pick<
  Todo,
  'id' | 'status' | 'title' | 'description' | 'createdAt'
>;


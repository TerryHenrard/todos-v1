'use client';

import { InferSelectModel } from 'drizzle-orm';
import TodoCard from './to-do-card';
import { todos } from '@/db/schema';
import { useQuery } from '@tanstack/react-query';
import { getTodosByUserId } from '@/actions/todoAction';
import { Skeleton } from '../ui/skeleton';
import { motion, AnimatePresence } from 'motion/react';
interface ToDoListProps {
  userId: InferSelectModel<typeof todos>['userId'];
}

export default function ToDoList({ userId }: ToDoListProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getTodosByUserId(userId),
  });

  if (error) return <p>Failed to get to do&apos;s</p>;

  if (isPending) {
    return (
      <div className="mt-5 space-y-4">
        {Array.from({ length: 5 }).map(() => (
          <div
            key={crypto.randomUUID()}
            className="space-y-3 rounded-lg border p-4"
          >
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data?.todos?.length === 0) return <p>You don&apos;t have to do yet</p>;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="todo-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {data?.todos?.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <TodoCard
              id={todo.id}
              createdAt={todo.createdAt}
              title={todo.title}
              description={todo.description}
              status={todo.status}
              userId={userId}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

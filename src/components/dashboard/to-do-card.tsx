'use client';

import { TodoCardData } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { InferSelectModel } from 'drizzle-orm';
import { todos } from '@/db/schema';
import { Check, Clock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import TodoActions from './to-do-actions';
import { type Session } from '@/lib/auth-client';
import { formatDateShort, formatTimeDetailed } from '@/lib/formatters';

interface ToDoCardProps extends TodoCardData {
  userId: Session['user']['id'];
}

export default function TodoCard({
  id,
  status,
  title,
  description,
  createdAt,
  updatedAt,
  userId,
}: ToDoCardProps) {
  const finishedStyles = cn({
    'line-through opacity-33': status === 'finished',
  });

  return (
    <Card className="my-5 p-2">
      <CardHeader>
        <div className="flex justify-between">
          <TodoBadge status={status} />
          <TodoActions
            id={id}
            title={title}
            userId={userId}
            description={description}
          />
        </div>
        <CardTitle className={finishedStyles}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={finishedStyles}>{description}</CardContent>
      <CardFooter className="flex justify-between text-gray-400">
        <Button variant={'secondary'}>button</Button>
        {updatedAt ? (
          <span className="text-xs">
            Last updated on {formatDateShort(updatedAt)} at{' '}
            {formatTimeDetailed(updatedAt)}
          </span>
        ) : (
          <span className="text-xs">
            Created on {formatDateShort(createdAt)} at{' '}
            {formatTimeDetailed(createdAt)}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}

const TODO_STATUS_CONFIG = {
  'to do': {
    icon: Clock,
    className: 'bg-gray-200 text-gray-700',
  },
  finished: {
    icon: Check,
    className: 'bg-green-200 text-green-700',
  },
  'to complete': {
    icon: Play,
    className: 'bg-blue-200 text-blue-700',
  },
};

interface TodoBadgeProps {
  status: InferSelectModel<typeof todos>['status'];
}

function TodoBadge({ status }: TodoBadgeProps) {
  const config = TODO_STATUS_CONFIG[status];

  if (!config) {
    return <Badge variant="outline">{status}</Badge>;
  }

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex h-min items-center gap-1 rounded-full',
        config.className
      )}
    >
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
}

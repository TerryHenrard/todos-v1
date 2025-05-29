'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod/v4';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InsertTodo } from '@/types';
import { InferSelectModel } from 'drizzle-orm';
import { todos } from '@/db/schema';
import Loader from '../ui/loader';
import { toast } from 'sonner';

interface TodoFormProps {
  userId: InferSelectModel<typeof todos>['userId'];
  todo?: ToDoFormValues;
  behavior: 'adding' | 'updating';
  onSuccess: () => void;
  mutationFn: (
    todo: InsertTodo
  ) => Promise<{ message: string; isSuccess: boolean }>;
}

interface ToDoFormValues {
  title: string;
  description: string | null;
}

const ToDoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(256, 'Title must be at most 256 characters long'),
  description: z.string().nullable(),
});

const ToDoForm = ({
  userId,
  todo = { title: '', description: '' },
  behavior,
  onSuccess,
  mutationFn,
}: TodoFormProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn,
    onError: (error) => {
      console.error('Error adding todo:', error);
    },
  });

  const form = useForm({
    defaultValues: {
      title: todo.title || '',
      description: todo.description || '',
    } as ToDoFormValues,

    validators: {
      onSubmit: ToDoFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { isSuccess } = await mutation.mutateAsync({ ...value, userId });
        if (isSuccess) {
          queryClient.invalidateQueries({ queryKey: ['todos', userId] });
          form.reset();
          onSuccess();
          toast(
            `"${value.title}" ${behavior === 'adding' ? 'added' : 'updated'} successfully`
          );
        }
      } catch (error) {
        toast('An unexpected error append');
        console.error('Error adding todo:', error);
      }
    },
  });

  return (
    <form
      data-slot="todo-form"
      className="flex w-full flex-col gap-6 px-2 sm:max-w-md sm:px-0"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      {' '}
      <h2 id="add-todo-form-title" className="sr-only">
        {behavior === 'adding' ? 'Add Todo' : 'Update Todo'}
      </h2>
      <form.Field name="title">
        {(field) => (
          <div data-slot="form-field-title" className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Go to the gym"
              value={field.state.value}
              onChange={({ target }) => field.handleChange(target.value)}
              className="focus-visible:ring-primary border-input bg-background aria-[invalid=true]:ring-destructive w-full rounded-md border px-3 py-2 text-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
            {field.state.meta.errors?.length ? (
              <span
                className="text-destructive mt-1 text-xs"
                data-slot="error-title"
              >
                {field.state.meta.errors[0]?.message}
              </span>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Field name="description">
        {(field) => (
          <div
            data-slot="form-field-description"
            className="flex flex-col gap-2"
          >
            <Label htmlFor="description" className="text-base font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Biceps and triceps training plus 20 minutes running"
              value={field.state.value ?? ''}
              onChange={({ target }) => field.handleChange(target.value)}
              className="focus-visible:ring-primary border-input bg-background aria-[invalid=true]:ring-destructive min-h-[80px] w-full resize-y rounded-md border px-3 py-2 text-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
            {field.state.meta.errors?.length ? (
              <span
                className="text-destructive mt-1 text-xs"
                data-slot="error-description"
              >
                {field.state.meta.errors[0]?.message}
              </span>
            ) : null}
          </div>
        )}
      </form.Field>{' '}
      <div className="flex flex-col items-stretch justify-end gap-2 pt-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={form.state.isSubmitting || mutation.isPending}
        >
          {' '}
          {form.state.isSubmitting || mutation.isPending ? (
            <>
              <Loader />
              <span className="ml-2">
                {behavior === 'adding' ? 'Adding...' : 'Updating...'}
              </span>
            </>
          ) : behavior === 'adding' ? (
            'Add Todo'
          ) : (
            'Update Todo'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ToDoForm;

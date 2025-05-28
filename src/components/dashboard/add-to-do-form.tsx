'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod/v4';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface AddToDoFormValues {
  title: string;
  description: string | null;
}

const AddToDoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is requireds')
    .max(256, 'Title must be at most 256 characters long'),
  description: z.string().nullable(),
});

const AddToDoForm = () => {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    } as AddToDoFormValues,

    validators: {
      onSubmit: AddToDoFormSchema,
    },

    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      data-slot="add-to-do-form"
      className="flex w-full flex-col gap-6 px-2 sm:max-w-md sm:px-0"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <h2 id="add-todo-form-title" className="sr-only">
        Add Todo
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
              <span className="text-destructive mt-1 text-xs">
                {field.state.meta.errors[0]?.message}
              </span>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col gap-2">
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
      </form.Field>

      <div className="flex flex-col items-stretch justify-end gap-2 pt-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting ? 'Adding...' : 'Add Todo'}
        </Button>
      </div>
    </form>
  );
};

export default AddToDoForm;


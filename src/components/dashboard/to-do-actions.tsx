'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferSelectModel } from 'drizzle-orm';
import { todos } from '@/db/schema';
import { deleteTodo } from '@/actions/todoAction';
import Loader from '../ui/loader';
import { toast } from 'sonner';

interface TodoActionsProps {
  id: InferSelectModel<typeof todos>['id'];
  title: InferSelectModel<typeof todos>['title'];
  userId: InferSelectModel<typeof todos>['userId'];
}

const TodoActions = ({ id, title, userId }: TodoActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete', id],
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      toast(`"${title}" deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['todos', userId] });
    },
  });

  const handleClickOnEditButton = () => {};

  return (
    <div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <Button variant={'ghost'} onClick={handleClickOnEditButton}>
          <Edit />
        </Button>
        <AlertDialogTrigger asChild>
          <Button variant={'ghost'}>
            <Trash2 color="red" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your to
              do and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TodoActions;

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferSelectModel } from 'drizzle-orm';
import { todos } from '@/db/schema';
import { deleteTodo, updateTodo } from '@/actions/todoAction';
import Loader from '../ui/loader';
import { toast } from 'sonner';
import ToDoForm from './to-do-form';
import { Separator } from '../ui/separator';

interface TodoActionsProps {
  id: InferSelectModel<typeof todos>['id'];
  title: InferSelectModel<typeof todos>['title'];
  description: InferSelectModel<typeof todos>['description'];
  userId: InferSelectModel<typeof todos>['userId'];
}

const TodoActions = ({ id, title, description, userId }: TodoActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ['delete', id],
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      toast(`"${title}" deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['todos', userId] });
      setIsDeleteDialogOpen(false);
    },
  });

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div className="flex gap-1">
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <Separator />{' '}
          <ToDoForm
            userId={userId}
            todo={{ id, title, description }}
            behavior="updating"
            onSuccess={handleEditSuccess}
            mutationFn={updateTodo}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              todo and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? <Loader /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TodoActions;

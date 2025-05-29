'use client';

import { List, Grid2x2, Columns3, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import ToDoForm from './to-do-form';
import { Session } from '@/lib/auth-client';
import { useState } from 'react';
import { insertTodo } from '@/actions/todoAction';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

interface ToDoControlsProps {
  userId: Session['user']['id'];
}

const ToDoControls = ({ userId }: ToDoControlsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="flex justify-between">
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">
            <List /> List
          </TabsTrigger>
          <TabsTrigger value="grid">
            <Grid2x2 /> Grid
          </TabsTrigger>
          <TabsTrigger value="kanban">
            <Columns3 /> Kanban
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleDialogOpen}>
            <Plus /> Add To Do
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Task</DialogTitle>
          </DialogHeader>
          <Separator />
          <ToDoForm
            userId={userId}
            onSuccess={handleDialogClose}
            mutationFn={insertTodo}
            behavior={'adding'}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToDoControls;


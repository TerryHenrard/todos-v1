import AddToDoForm from '@/components/dashboard/add-to-do-form';
import ToDoList from '@/components/dashboard/to-do-list';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSession } from '@/lib/server-utils';
import { Columns3, Grid2x2, List, Plus } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl min-w-0 px-4 sm:min-w-[500px]">
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

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add To Do
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new Task</DialogTitle>
            </DialogHeader>
            <Separator />
            <AddToDoForm />
          </DialogContent>
        </Dialog>
      </div>
      <ToDoList userId={session.user.id} />
    </div>
  );
}

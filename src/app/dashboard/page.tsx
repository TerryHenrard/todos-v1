import ToDoControls from '@/components/dashboard/to-do-controls';
import ToDoList from '@/components/dashboard/to-do-list';
import { getSession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl min-w-0 px-4 sm:min-w-[500px]">
      <ToDoControls userId={session.user.id} />
      <ToDoList userId={session.user.id} />
    </div>
  );
}

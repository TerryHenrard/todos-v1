import ToDoList from '@/components/dashboard/to-do-list';
import { getSession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="mx-auto w-full max-w-3xl min-w-0 px-4 sm:min-w-[500px]">
      <ToDoList userId={session.user.id} />
    </div>
  );
}

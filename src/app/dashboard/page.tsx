import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log(session);

  if (!session) {
    redirect('/sign-in');
  }

  return <div>Dashboard page</div>;
}

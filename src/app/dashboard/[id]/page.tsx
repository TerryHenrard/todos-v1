import { getSession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

interface DashboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }

  const { id } = await params;

  return <div>{id}</div>;
}


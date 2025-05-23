import { getSession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }

  // Use session.user.id directly - no need for URL parameter
  const userId = session.user.id;

  return (
    <div>
      <h1>Welcome to your dashboard, {session.user.name}!</h1>
      <p>Your user ID: {userId}</p>
      {/* Add your dashboard content here */}
    </div>
  );
}


import { getTodosByUserId } from '@/actions/todoAction';
import { getSession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }

  const todos = await getTodosByUserId(session.user.id);
  console.log(todos);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="m-5">
          <h5>{todo.title}</h5>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

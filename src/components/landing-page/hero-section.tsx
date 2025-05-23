import { getSession } from '@/lib/server-utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function HeroSection() {
  const session = await getSession();

  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <Image
          src="https://placehold.co/300x300/6366f1/white.svg?text=TodoApp"
          alt="Todo App Logo"
          className="mx-auto mb-8 rounded-full shadow-2xl"
          width={300}
          height={300}
          priority
        />
        <h1 className="mb-4 text-5xl font-bold">
          Organize Your Life with TodoApp
        </h1>
        <p className="mb-8 text-xl text-slate-300">
          The simple, beautiful, and effective way to manage your tasks.
        </p>
        <Link
          href={session ? `/dashboard/${session.user.id}` : '/sign-in'}
          className="transform rounded-lg bg-indigo-500 px-8 py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-600"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}


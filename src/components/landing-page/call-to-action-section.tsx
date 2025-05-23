import Link from 'next/link';

export default function CallToActionSection() {
  return (
    <section className="bg-indigo-700 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-4xl font-bold">
          Ready to Boost Your Productivity?
        </h2>
        <p className="mb-8 text-xl text-indigo-200">
          Join thousands of users who are already managing their lives better
          with TodoApp.
        </p>
        <Link
          href="/api/auth/login"
          className="transform rounded-lg bg-white px-10 py-4 text-xl font-bold text-indigo-700 transition duration-300 ease-in-out hover:scale-105 hover:bg-slate-100"
        >
          Sign Up Now - It&apos;s Free!
        </Link>
      </div>
    </section>
  );
}

import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section className="bg-slate-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Why Choose TodoApp?
        </h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div className="rounded-xl bg-slate-700 p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <Image
              src="https://placehold.co/150x150/818cf8/white.svg?text=Easy"
              alt="Easy to Use"
              className="mx-auto mb-6 rounded-lg"
              width={150}
              height={150}
            />
            <h3 className="mb-3 text-2xl font-semibold">Easy to Use</h3>
            <p className="text-slate-300">
              Intuitive interface that makes task management a breeze.
            </p>
          </div>
          <div className="rounded-xl bg-slate-700 p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <Image
              src="https://placehold.co/150x150/a5b4fc/white.svg?text=Organize"
              alt="Stay Organized"
              className="mx-auto mb-6 rounded-lg"
              width={150}
              height={150}
            />
            <h3 className="mb-3 text-2xl font-semibold">Stay Organized</h3>
            <p className="text-slate-300">
              Keep track of all your tasks, deadlines, and priorities in one
              place.
            </p>
          </div>
          <div className="rounded-xl bg-slate-700 p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <Image
              src="https://placehold.co/150x150/c7d2fe/white.svg?text=Access"
              alt="Access Anywhere"
              className="mx-auto mb-6 rounded-lg"
              width={150}
              height={150}
            />
            <h3 className="mb-3 text-2xl font-semibold">Access Anywhere</h3>
            <p className="text-slate-300">
              Sync across your devices and access your todos anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

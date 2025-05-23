import Image from 'next/image';

export default function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">How It Works</h2>
        <div className="flex flex-col items-center justify-around gap-10 md:flex-row">
          <div className="md:w-1/2">
            <Image
              src="https://placehold.co/600x400/4f46e5/white.png?text=TodoApp+Interface"
              alt="TodoApp Interface Screenshot"
              className="rounded-xl shadow-2xl"
              width={600}
              height={400}
            />
          </div>
          <div className="text-lg md:w-1/3">
            <ol className="list-inside list-decimal space-y-4 text-slate-300">
              <li>
                <span className="font-semibold text-white">Sign Up:</span>{' '}
                Create your account in seconds.
              </li>
              <li>
                <span className="font-semibold text-white">Add Tasks:</span>{' '}
                Quickly add your to-dos with details and due dates.
              </li>
              <li>
                <span className="font-semibold text-white">Organize:</span>{' '}
                Categorize and prioritize your tasks.
              </li>
              <li>
                <span className="font-semibold text-white">Achieve:</span> Mark
                tasks as complete and track your progress!
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

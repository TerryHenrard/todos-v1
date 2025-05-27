import Image from 'next/image';

export default function TestLandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] px-4 py-12 dark:from-[#18181b] dark:to-[#23272f]">
      <main className="flex w-full max-w-5xl flex-col-reverse items-center gap-12 md:flex-row">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Organize Your Life
            <br /> with{' '}
            <span className="text-blue-600 dark:text-blue-400">Todos</span>
          </h1>
          <p className="mb-8 max-w-md text-lg text-gray-600 sm:text-xl dark:text-gray-300">
            Stay productive and never miss a task again. Your simple, beautiful,
            and powerful todo app.
          </p>
          <a
            href="#"
            className="inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Get Started
          </a>
        </div>
        <div className="flex flex-1 justify-center">
          <Image
            src="https://placehold.co/500x400/png?text=Todo+App+Preview&font=roboto"
            alt="Todo App Preview"
            width={500}
            height={400}
            className="rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            priority
          />
        </div>
      </main>
    </div>
  );
}

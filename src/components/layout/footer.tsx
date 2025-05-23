export default function Footer() {
  return (
    <footer className="bg-slate-900 py-8 text-center">
      <p className="text-slate-400">
        &copy; {new Date().getFullYear()} TodoApp. All rights reserved.
      </p>
      <p className="text-slate-500">
        Powered by Next.js and Tailwind CSS. Placeholder images from
        placehold.co.
      </p>
    </footer>
  );
}

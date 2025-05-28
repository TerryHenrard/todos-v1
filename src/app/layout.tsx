import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import Providers from '@/components/providers';
import Insights from '@/components/insights';

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
          <Toaster />
          <Insights />
        </Providers>
      </body>
    </html>
  );
}

import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import Providers from '@/components/providers';

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
        </Providers>
      </body>
    </html>
  );
}

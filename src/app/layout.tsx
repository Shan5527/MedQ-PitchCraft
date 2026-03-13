import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'MediFlow',
  description: 'From symptoms to treatment — without the chaos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen w-full flex-col">
          <main className="mx-auto w-full max-w-lg flex-1 bg-background">
            <div className="flex-1 p-4 pb-24">{children}</div>
          </main>
          <BottomNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

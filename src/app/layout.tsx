import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import AppHeader from '@/components/app-header';
import AppNav from '@/components/app-nav';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'MedQ',
  description: 'From symptoms to treatment — without the chaos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen w-full flex-col bg-secondary/50">
          <AppHeader />
          <main className="mx-auto w-full max-w-lg flex-1 bg-background shadow-md">
            <div className="flex-1 p-4">{children}</div>
          </main>
          <AppNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

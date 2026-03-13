import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins } from 'next/font/google';
import AppHeader from '@/components/app-header';
import AppNav from '@/components/app-nav';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        <div className="w-full bg-secondary/50">
          <div className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col bg-background shadow-2xl">
            <AppHeader />
            <main className="flex-1">
              <div className="flex-1 p-4">{children}</div>
            </main>
            <AppNav />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

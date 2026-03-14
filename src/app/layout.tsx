import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins } from 'next/font/google';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
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
        <div className="relative flex min-h-screen flex-col bg-background">
          <AppHeader />
          <main className="mx-auto w-full max-w-5xl flex-1 p-4">
            {children}
          </main>
          <AppFooter />
          <AppNav />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

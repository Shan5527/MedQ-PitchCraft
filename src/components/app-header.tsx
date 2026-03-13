'use client';
import Link from 'next/link';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function AppHeader() {
  const pathname = usePathname();
  const logo = placeholderImages.find(p => p.id === 'logo');

  const getTitle = () => {
    if (pathname === '/') return 'Hello, Guest';
    if (pathname.startsWith('/symptom-checker')) return 'Symptom Check';
    if (pathname.startsWith('/queue')) return 'Queue Status';
    if (pathname.startsWith('/beds')) return 'Bed Availability';
    if (pathname.startsWith('/billing')) return 'Understand Your Bill';
    if (pathname.startsWith('/history')) return 'My Profile';
    return 'MedQ';
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-between px-4">
        <div>
           {pathname === '/' && logo ? (
            <Link href="/">
              <Image
                src={logo.imageUrl}
                alt="MedQ Logo"
                width={80}
                height={28}
                priority
                data-ai-hint={logo.imageHint}
              />
            </Link>
           ) : (
             <h1 className="text-xl font-bold text-primary font-headline">
              {getTitle()}
             </h1>
           )}
        </div>
        <Link href="/history">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <User className="h-6 w-6 text-primary" />
          </div>
        </Link>
      </div>
    </header>
  );
}

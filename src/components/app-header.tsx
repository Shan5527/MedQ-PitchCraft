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
    if (pathname.startsWith('/symptom-checker')) return 'Symptom Check';
    if (pathname.startsWith('/queue')) return 'Queue Status';
    if (pathname.startsWith('/beds')) return 'Bed Availability';
    if (pathname.startsWith('/billing')) return 'Understand Your Bill';
    if (pathname.startsWith('/history')) return 'My Profile';
    return 'MedQ';
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-lg items-center justify-between px-4">
        <div>
           {pathname === '/' && logo ? (
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-16 w-16">
                <Image
                    src={logo.imageUrl}
                    alt="MedQ Logo"
                    fill
                    className="object-contain"
                    priority
                    data-ai-hint={logo.imageHint}
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-headline">
                  Med<span className="text-destructive">Q</span>
                </h1>
              </div>
            </Link>
           ) : (
             <h1 className="text-2xl font-bold font-headline">
              {getTitle()}
             </h1>
           )}
        </div>
        <Link href="/history">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
            <User className="h-6 w-6 text-primary" />
          </div>
        </Link>
      </div>
    </header>
  );
}

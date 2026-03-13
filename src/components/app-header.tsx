'use client';
import Link from 'next/link';
import { User } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function AppHeader() {
  const logo = placeholderImages.find(p => p.id === 'logo');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-soft">
      <div className="mx-auto flex h-20 w-full max-w-5xl items-center justify-between px-4">
        <div>
           {logo && (
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12">
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
                <h1 className="text-4xl font-bold font-headline text-foreground">
                  Med<span className="text-destructive">Q</span>
                </h1>
              </div>
            </Link>
           )}
        </div>
        <Link href="/profile">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
        </Link>
      </div>
    </header>
  );
}

'use client';
import Link from 'next/link';
import { User } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/symptom-checker', label: 'Symptom Check' },
  { href: '/beds', label: 'Bed Finder' },
  { href: '/experts', label: 'Experts' },
  { href: '/queue/token', label: 'Queue' },
  { href: '/billing', label: 'Billing' },
];

export default function AppHeader() {
  const logo = placeholderImages.find(p => p.id === 'logo');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-primary">
      <div className="mx-auto flex h-20 w-full max-w-5xl items-center justify-between px-4">
        <div className="bg-white rounded-lg p-2">
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium text-primary-foreground">
          {navItems.map((item) => {
            const isActive = (pathname === '/' && item.href === '/') || 
                             (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link 
                href={item.href} 
                key={item.label}
                className={cn(
                  "transition-colors hover:text-white/90",
                  isActive ? "text-white" : "text-white/70"
                )}
              >
                {item.label}
              </Link>
            )
          })}
           <Link href="/profile" className="ml-4">
              <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors",
                  pathname.startsWith('/profile') && 'bg-primary-foreground/40 ring-2 ring-white'
                )}>
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
          </Link>
        </nav>

        {/* Mobile: Show profile icon as the main nav is at the bottom */}
        <div className="md:hidden">
            <Link href="/profile">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
        </div>
      </div>
    </header>
  );
}

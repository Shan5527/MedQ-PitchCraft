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
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top bar with logo */}
      <div className="bg-primary">
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
            
            <Link href="/profile">
                <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors",
                    pathname.startsWith('/profile') && 'bg-primary-foreground/40 ring-2 ring-white'
                    )}>
                    <User className="h-6 w-6 text-primary-foreground" />
                </div>
            </Link>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-primary/95 border-t border-primary-foreground/10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 h-12">
            <div className="flex items-center gap-8 text-base font-medium text-primary-foreground">
                {navItems.map((item) => {
                    const isActive = (pathname === '/' && item.href === '/') || 
                                    (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                    <Link 
                        href={item.href} 
                        key={item.label}
                        className={cn(
                        "transition-colors hover:text-white py-2",
                        isActive ? "text-white font-semibold border-b-2 border-white" : "text-white/70"
                        )}
                    >
                        {item.label}
                    </Link>
                    )
                })}
            </div>
        </div>
      </nav>
    </header>
  );
}

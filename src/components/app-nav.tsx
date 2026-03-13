'use client';
import Link from 'next/link';
import { Home, Stethoscope, Users, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/symptom-checker', icon: Stethoscope, label: 'Checkup' },
  { href: '/queue/token', icon: Users, label: 'Queue' },
  { href: '/history', icon: User, label: 'Profile' },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-40 mt-auto w-full border-t bg-background/95">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-4 items-center">
        {navItems.map((item) => {
          // A more robust check for active state
          const isActive = (pathname === '/' && item.href === '/') || 
                           (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link href={item.href} key={item.label} className="relative flex h-full flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary">
              <div className={cn("absolute top-0 h-1 w-12 rounded-b-full", isActive ? "bg-primary" : "bg-transparent")}></div>
              <item.icon className={cn('h-6 w-6', isActive && 'text-primary')} />
              <span className={cn('text-xs font-medium', isActive && 'text-primary')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

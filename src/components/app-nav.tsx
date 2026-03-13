'use client';
import Link from 'next/link';
import { Home, Users, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/queue/token', icon: Users, label: 'Queue' },
  { href: '/', icon: Home, label: 'Home' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-40 mt-auto w-full border-t bg-background/95">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-3 items-center">
        {navItems.map((item) => {
          // A more robust check for active state
          const isActive = (pathname === '/' && item.href === '/') || 
                           (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link 
              href={item.href} 
              key={item.label} 
              className={cn(
                "relative flex h-full flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary",
                isActive && "text-primary bg-primary/10"
              )}
            >
              <div className={cn("absolute top-0 h-1 w-12 rounded-b-full", isActive ? "bg-primary" : "bg-transparent")}></div>
              <item.icon className={'h-6 w-6'} />
              <span className={'text-xs font-medium'}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

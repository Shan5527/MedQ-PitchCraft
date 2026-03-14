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
    <nav className="sticky bottom-4 z-40 w-full md:hidden">
      <div className="mx-auto grid h-16 max-w-xs grid-cols-3 items-center rounded-full bg-card p-1 shadow-soft">
        {navItems.map((item) => {
          const isActive = (pathname === '/' && item.href === '/') || 
                           (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link 
              href={item.href} 
              key={item.label} 
              className={cn(
                "relative flex h-14 flex-col items-center justify-center gap-1 rounded-full text-muted-foreground transition-colors hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <div className={cn("absolute inset-0 h-full w-full rounded-full", isActive ? "bg-primary/10" : "bg-transparent")}></div>
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

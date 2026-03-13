'use client';

import {
  Home,
  Stethoscope,
  BedDouble,
  FileText,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/symptom-checker', label: 'Triage', icon: Stethoscope },
  { href: '/beds', label: 'Beds', icon: BedDouble },
  { href: '/history', label: 'Visits', icon: History },
  { href: '/billing', label: 'Billing', icon: FileText },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-t-lg">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group inline-flex flex-col items-center justify-center px-2 text-center text-muted-foreground hover:bg-muted/50 hover:text-primary',
                { 'text-primary': isActive }
              )}
            >
              <item.icon
                className={cn('mb-1 h-6 w-6', {
                  'text-primary': isActive,
                })}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

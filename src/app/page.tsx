import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, UserPlus, BedDouble, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">
          MediW
        </h1>
        <p className="text-muted-foreground">
          From symptoms to treatment — without the chaos.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <ActionButton
          href="/symptom-checker"
          icon={Stethoscope}
          label="Start Symptom Check"
        />
        <ActionButton
          href="/queue/token"
          icon={UserPlus}
          label="Join Hospital Queue"
        />
        <ActionButton
          href="/beds"
          icon={BedDouble}
          label="Find Available Beds"
        />
        <ActionButton
          href="/billing"
          icon={FileText}
          label="Understand My Bill"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Current Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Token</p>
              <p className="text-2xl font-bold">B23</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-muted-foreground">Est. Wait</p>
              <p className="text-2xl font-bold">18 min</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Department: <span className="font-medium text-foreground">General Medicine</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ActionButton({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link href={href} passHref>
      <Button
        variant="outline"
        className="h-28 w-full flex-col justify-center space-y-2 rounded-lg border-2 text-center shadow-sm hover:border-primary hover:bg-primary/5"
      >
        <Icon className="h-8 w-8 text-primary" />
        <span className="whitespace-normal text-sm font-semibold">{label}</span>
      </Button>
    </Link>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, UserPlus, BedDouble, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const illustration = placeholderImages.find(p => p.id === 'home-doctor-assist');

  return (
    <div className="flex flex-col space-y-8">
      <header className="text-center space-y-4">
        {illustration && (
           <Image
            src={illustration.imageUrl}
            alt={illustration.description}
            width={600}
            height={400}
            data-ai-hint={illustration.imageHint}
            className="w-48 h-32 mx-auto object-cover rounded-lg"
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">
          MediFlow
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Helping you find the right care, faster. We’ll guide you through every step.
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
          <CardTitle className="text-lg">Your Visit Status</CardTitle>
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
        className="h-32 w-full flex-col justify-center space-y-2 rounded-lg border-2 p-4 text-center shadow-sm hover:border-primary hover:bg-primary/5"
      >
        <Icon className="h-8 w-8 text-primary" />
        <span className="whitespace-normal text-sm font-semibold">{label}</span>
      </Button>
    </Link>
  );
}

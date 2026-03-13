import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, BedDouble, FileText, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const actions = [
    {
      label: 'Symptom Check',
      href: '/symptom-checker',
      icon: Stethoscope,
      description: 'Analyze your symptoms'
    },
    {
      label: 'Bed Finder',
      href: '/beds',
      icon: BedDouble,
      description: 'Find available hospital beds'
    },
    {
      label: 'Understand Bill',
      href: '/billing',
      icon: FileText,
      description: 'Explain your medical bill'
    },
     {
      label: 'Talk to an Expert',
      href: '/experts',
      icon: Users,
      description: 'Connect with doctors & nurses'
    },
  ];
  
  const heroBanner = placeholderImages.find(p => p.id === 'home-hero');

  return (
    <div className="flex flex-col space-y-6">
      {heroBanner && (
        <Card className="overflow-hidden border-none bg-primary/10 shadow-none">
          <CardContent className="flex flex-col items-center p-6 text-center md:flex-row md:p-8 md:text-left">
            <Image
                src={heroBanner.imageUrl}
                alt={heroBanner.description}
                width={300}
                height={200}
                className="w-48 object-contain md:w-56"
                data-ai-hint={heroBanner.imageHint}
            />
            <div className="mt-4 md:mt-0 md:ml-8">
                <h2 className="text-2xl font-bold text-primary font-headline lg:text-3xl">
                  Find the right care, faster
                </h2>
                <p className="mt-2 text-muted-foreground lg:text-lg">We’ll guide you through every step.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map(action => (
          <Link href={action.href} key={action.label}>
            <Card className="h-full hover:border-primary hover:bg-primary/5 transition-all">
                <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <action.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{action.label}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

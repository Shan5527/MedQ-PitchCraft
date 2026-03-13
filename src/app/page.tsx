import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Menu, Settings, ShoppingCart, Search, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const offerings = [
    {
      label: 'Doctor Consult',
      href: '/symptom-checker',
      image: placeholderImages.find(p => p.id === 'doctor-consult'),
      offer: 'FROM ₹199'
    },
    {
      label: 'Lab Tests',
      href: '/history',
      image: placeholderImages.find(p => p.id === 'lab-tests'),
      offer: 'UPTO 70% OFF'
    },
    {
      label: 'Medicines',
      href: '/beds',
      image: placeholderImages.find(p => p.id === 'medicine'),
      offer: 'SAVE 25%'
    },
    {
      label: 'Bill Analyser',
      href: '/billing',
      image: placeholderImages.find(p => p.id === 'branded-substitute'),
      offer: 'FREE'
    },
  ];
  
  const promoBanner = placeholderImages.find(p => p.id === 'promo-banner');

  return (
    <div className="flex flex-col space-y-4 -m-4 bg-gray-50">
      <header className="bg-white p-3 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="h-6 w-6 text-gray-600" />
             <h1 className="text-xl font-bold text-primary">MediFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <Settings className="h-6 w-6 text-gray-600" />
            <ShoppingCart className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="bg-primary/90 p-4 text-white">
          <h2 className="text-2xl font-bold mb-2">What are you looking for?</h2>
          <div className="relative flex items-center">
            <Input type="search" placeholder="Search for Medicines, Tests & more" className="bg-white text-black pl-10 pr-20 h-12 rounded-full" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-9">Search</Button>
          </div>
        </div>

        <div className="bg-white p-4">
          <Link href="/billing" className='text-decoration-none'>
            <Card className="mb-6 shadow-none border-dashed border-2">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Upload className="h-6 w-6 text-primary" />
                  <p className="font-semibold">Order with prescription</p>
                </div>
                <span className="text-sm font-bold text-primary">UPLOAD NOW &gt;</span>
              </CardContent>
            </Card>
          </Link>

          <section className="mb-6">
            <h3 className="text-xl font-bold mb-4">Discover Our Offerings</h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              {offerings.map(offering => (
                <Link href={offering.href} key={offering.label} className="block">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mb-2 w-20 h-20 flex items-center justify-center">
                       {offering.image && (
                        <Image 
                          src={offering.image.imageUrl} 
                          alt={offering.label}
                          width={64}
                          height={64}
                          className="rounded-md object-contain h-14 w-14"
                          data-ai-hint={offering.image.imageHint}
                        />
                       )}
                    </div>
                    <p className="text-sm font-semibold leading-tight">{offering.label}</p>
                    <p className="text-xs text-accent font-bold mt-1">{offering.offer}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
             {promoBanner && (
                <Card className="overflow-hidden rounded-lg">
                    <Image
                        src={promoBanner.imageUrl}
                        alt="Doctor Consult"
                        width={800}
                        height={400}
                        className="w-full object-cover"
                        data-ai-hint={promoBanner.imageHint}
                    />
                </Card>
             )}
          </section>
        </div>
      </main>
    </div>
  );
}

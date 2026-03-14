'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Stethoscope, BedDouble, FileText, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

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
  const heroBg = placeholderImages.find(p => p.id === 'home-hero-bg');

  const blogs = [
    {
      title: "Navigating Senior Health",
      snippet: "Key tips for staying healthy and active in your golden years.",
      image: placeholderImages.find(p => p.id === 'blog-1'),
    },
    {
      title: "The Rise of Home Healthcare",
      snippet: "How personalized care at home is changing the medical landscape.",
      image: placeholderImages.find(p => p.id === 'blog-2'),
    },
    {
      title: "A Guide to Your First Check-up",
      snippet: "What to expect and how to prepare for a routine medical visit.",
      image: placeholderImages.find(p => p.id === 'blog-3'),
    },
    {
        title: "Mental Health Matters",
        snippet: "Breaking the stigma and finding support for your mental well-being.",
        image: placeholderImages.find(p => p.id === 'blog-4'),
    },
    {
        title: "Healthy Eating 101",
        snippet: "Simple dietary changes for a healthier, more energetic life.",
        image: placeholderImages.find(p => p.id === 'blog-5'),
    },
    {
        title: "Your Guide to Pediatric Care",
        snippet: "Ensuring your child gets the best start with preventative care.",
        image: placeholderImages.find(p => p.id === 'blog-6'),
    },
  ];

  return (
    <div className="flex flex-col space-y-12">
      <div className="relative overflow-hidden rounded-3xl">
        {heroBg && (
          <Image
            src={heroBg.imageUrl}
            alt={heroBg.description}
            fill
            className="object-cover opacity-25 scale-110"
            data-ai-hint={heroBg.imageHint}
          />
        )}
        <div className="relative">
          {heroBanner && (
            <Card className="m-6 border-none bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center gap-8 p-0 text-center md:flex-row md:text-left">
                  <div className="flex-1">
                      <h2 className="text-4xl font-bold text-foreground font-headline lg:text-5xl">
                        Find the right care, faster
                      </h2>
                      <p className="mt-4 text-muted-foreground lg:text-lg">We’ll guide you through every step of your healthcare journey.</p>
                  </div>
                  <Image
                      src={heroBanner.imageUrl}
                      alt={heroBanner.description}
                      width={400}
                      height={400}
                      className="w-64 flex-shrink-0 rounded-lg object-contain md:w-80"
                      data-ai-hint={heroBanner.imageHint}
                  />
                </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {actions.map((action) => (
          <Link href={action.href} key={action.label} className="group block h-full">
            <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5 group-hover:-translate-y-2 group-hover:shadow-xl">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                  <action.icon className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <CardTitle className="text-xl font-bold">
                    {action.label}
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

       <div id="blogs" className="space-y-6 scroll-mt-20">
        <h2 className="text-3xl font-bold text-foreground font-headline px-1">Recent Blogs</h2>
         <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {blogs.map((blog, index) => blog.image && (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                 <div className="p-1 h-full">
                    <Card key={blog.title} className="overflow-hidden flex flex-col transition-all hover:-translate-y-1 h-full">
                    <Image 
                        src={blog.image.imageUrl} 
                        alt={blog.image.description}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                        data-ai-hint={blog.image.imageHint}
                    />
                    <div className="flex flex-col flex-1">
                        <CardHeader>
                        <CardTitle>{blog.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                        <p className="text-muted-foreground">{blog.snippet}</p>
                        </CardContent>
                        <CardFooter>
                        <Button variant="link" className="px-0">Read More <span className="sr-only">about {blog.title}</span></Button>
                        </CardFooter>
                    </div>
                    </Card>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex"/>
          <CarouselNext className="hidden md:flex"/>
        </Carousel>
      </div>

    </div>
  );
}

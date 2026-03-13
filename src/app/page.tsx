import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  ]

  return (
    <div className="flex flex-col space-y-12">
      {heroBanner && (
        <Card className="border-none bg-transparent shadow-none">
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
                  className="w-64 flex-shrink-0 object-contain md:w-80"
                  data-ai-hint={heroBanner.imageHint}
              />
            </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {actions.map(action => (
          <Link href={action.href} key={action.label}>
            <Card className="h-full transition-all hover:border-primary hover:bg-primary/5 hover:-translate-y-1">
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

       <div className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground font-headline px-1">Recent Blogs</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.map(blog => blog.image && (
            <Card key={blog.title} className="overflow-hidden flex flex-col transition-all hover:-translate-y-1">
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
          ))}
        </div>
      </div>

    </div>
  );
}

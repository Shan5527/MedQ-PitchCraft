import { blogs } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BlogListPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline lg:text-5xl">
          Our Blog
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Insights and updates from the MedQ team.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => blog.image && (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="block h-full group">
                <Card key={blog.title} className="overflow-hidden flex flex-col transition-all group-hover:-translate-y-1 h-full">
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
                        <Button variant="link" className="px-0 group-hover:underline">Read More <span className="sr-only">about {blog.title}</span></Button>
                        </CardFooter>
                    </div>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}

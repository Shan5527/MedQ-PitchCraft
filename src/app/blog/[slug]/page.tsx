import { blogs } from '@/lib/blog-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { CalendarDays, UserCircle } from 'lucide-react';

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug:string } }) {
  const blog = blogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  // Simple parser for **bold text** to make headings
  const contentParts = blog.content.split(/(\*\*.*?\*\*)/g).filter(part => part);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline lg:text-5xl">
          {blog.title}
        </h1>
        <p className="text-xl text-muted-foreground">{blog.snippet}</p>
        <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span>MedQ Team</span>
            </div>
            <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>Published on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
      </header>

      {blog.image && (
        <Card className="overflow-hidden shadow-xl rounded-2xl">
          <Image
            src={blog.image.imageUrl}
            alt={blog.image.description}
            width={1200}
            height={630}
            className="w-full h-auto object-cover max-h-[450px]"
            priority
            data-ai-hint={blog.image.imageHint}
          />
        </Card>
      )}

      <article className="space-y-6">
        {contentParts.map((part, index) => {
           if (part.startsWith('**') && part.endsWith('**')) {
             return <h2 key={index} className="text-3xl font-bold mt-8 mb-4 font-headline text-foreground">{part.replaceAll('**', '')}</h2>
           }
           // Split by newlines for paragraphs
           return part.split('\n\n').map((paragraph, pIndex) => (
             <p key={`${index}-${pIndex}`} className="text-lg leading-relaxed text-foreground/80">
                {paragraph.trim()}
             </p>
           )).filter(p => p.props.children);
        })}
      </article>
    </div>
  );
}

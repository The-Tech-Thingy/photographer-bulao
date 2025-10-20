import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </header>
      
      {postImage && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
          <Image
            src={postImage.imageUrl}
            alt={post.title}
            data-ai-hint={postImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div 
        className="prose dark:prose-invert max-w-none 
                   prose-p:text-foreground/80
                   prose-headings:text-foreground prose-headings:font-headline
                   prose-h2:text-2xl prose-h3:text-xl
                   prose-strong:text-foreground
                   prose-a:text-primary hover:prose-a:text-primary/80
                   prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                   prose-ul:list-disc prose-ol:list-decimal
                   prose-li:marker:text-primary"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}

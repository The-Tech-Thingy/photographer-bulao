import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tips, and stories from the world of professional photography.',
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">The Photographer Bulao Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights, tips, and stories from the world of professional photography.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => {
          const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);
          return (
            <Card key={post.slug} className="flex flex-col overflow-hidden group">
              {postImage && (
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden" aria-label={post.title}>
                  <Image
                    src={postImage.imageUrl}
                    alt={post.title}
                    data-ai-hint={postImage.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full aspect-video transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              )}
              <CardHeader>
                <CardTitle as="h2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors text-xl">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">
                  by {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="ghost" className="text-primary hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

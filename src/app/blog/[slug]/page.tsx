'use client';

import { use, useEffect, useState } from 'react';
import type { Metadata } from 'next'
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Calendar, User, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { BlogPost } from '@/lib/types'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: post.title,
    description: post.summary,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const [postUrl, setPostUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPostUrl(window.location.href);
    }
  }, []);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast({
      title: "Link Copied!",
      description: "The link to this blog post has been copied to your clipboard.",
    });
  }

  const SocialShare = ({ url, title }: { url: string; title: string }) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <Button variant="outline" size="icon" asChild>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
       <Button variant="outline" size="icon" asChild>
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy link">
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );

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

      <Separator className="my-8" />

      <div className="flex justify-center">
        <SocialShare url={postUrl} title={post.title} />
      </div>

      <Separator className="my-8" />

      {/* Comments Section */}
      <section className="space-y-8" aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-2xl font-bold font-headline">{post.comments.length} Response(s)</h2>
        
        {/* Comment Form */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" placeholder="What are your thoughts?" rows={4} />
            </div>
            <Button>Submit Comment</Button>
          </form>
        </div>

        {/* Existing Comments */}
        <div className="space-y-6">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

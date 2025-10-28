'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, User, Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { BlogPost } from '@/lib/types';

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [postUrl, setPostUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // only available in browser
    setPostUrl(window.location.href);
  }, []);

  const postImage = PlaceHolderImages.find((img) => img.id === post.imageId);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast({ title: 'Link Copied!', description: 'The link to this blog post has been copied.' });
    } catch (e) {
      toast({ title: 'Copy failed', description: 'Unable to copy link.' });
    }
  };

  const SocialShare = ({ url, title }: { url: string; title: string }) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>

      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </Button>

      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
      </Button>

      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
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
          <Image src={postImage.imageUrl} alt={post.title} data-ai-hint={postImage.imageHint} fill className="object-cover" priority />
        </div>
      )}

      <div
        className="prose dark:prose-invert max-w-none ..."
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Separator className="my-8" />

      <div className="flex justify-center">
        <SocialShare url={postUrl} title={post.title} />
      </div>

      <Separator className="my-8" />

      {/* Comments (form + list) — same as your code */}
      {/* ... */}
    </article>
  );
}
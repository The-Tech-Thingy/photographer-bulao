// server page — NO "use client" here
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import BlogPostClient from './BlogPostClient'; // client component
import type { BlogPost } from '@/lib/types';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default function Page({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug) as BlogPost | undefined;

  if (!post) {
    notFound();
  }

  // Pass post prop to client component. Do NOT try to pass window/location from server.
  return <BlogPostClient post={post!} />;
}
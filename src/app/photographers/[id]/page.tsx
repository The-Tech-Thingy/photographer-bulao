'use client';

import { useState } from 'react';
import { photographers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export async function generateStaticParams() {
  return photographers.map((p) => ({ id: p.id }));
}

export default function PhotographerProfilePage({ params }: { params: { id: string } }) {
  const photographer = photographers.find((p) => p.id === params.id);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!photographer) {
    notFound();
  }

  const profileImage = PlaceHolderImages.find((img) => img.id === photographer.profileImage);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="items-center text-center">
              {profileImage && (
                <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={profileImage.imageUrl} alt={photographer.name} />
                    <AvatarFallback>{photographer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <CardTitle className="text-2xl mt-4">{photographer.name}</CardTitle>
               <CardDescription className="flex items-center gap-2 justify-center">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(photographer.rating) ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
                    ))}
                </div>
                <span>({photographer.reviewCount} reviews)</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mt-4 text-sm">{photographer.bio}</p>
            </CardContent>
             <CardFooter>
                <Link href="/book" className='w-full' passHref>
                    <Button className="w-full" size="lg">
                        Book a Service
                    </Button>
                </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>Share your experience with this photographer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => {
                          const ratingValue = index + 1;
                          return (
                              <Star
                                  key={ratingValue}
                                  className={`h-6 w-6 cursor-pointer transition-colors ${
                                      ratingValue <= (hoverRating || newRating)
                                          ? 'text-primary fill-primary'
                                          : 'text-muted-foreground/30'
                                  }`}
                                  onClick={() => setNewRating(ratingValue)}
                                  onMouseEnter={() => setHoverRating(ratingValue)}
                                  onMouseLeave={() => setHoverRating(0)}
                              />
                          );
                      })}
                  </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea id="comment" placeholder="Tell us about your experience..." rows={4} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Review
              </Button>
            </CardFooter>
          </Card>

          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Reviews</h2>
            <div className="space-y-6">
              {photographer.reviews.map((review) => (
                <div key={review.id} className="flex gap-4">
                    <Avatar>
                        <AvatarImage src={review.avatar} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

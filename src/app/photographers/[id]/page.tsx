import { photographers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, CheckCircle, Users, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export async function generateStaticParams() {
  return photographers.map((p) => ({ id: p.id }));
}

export default function PhotographerProfilePage({ params }: { params: { id: string } }) {
  const photographer = photographers.find((p) => p.id === params.id);

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
               <CardDescription className="flex items-center gap-2">
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

import { photographers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, CheckCircle, Users, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
    <div className="container mx-auto max-w-6xl px-4 py-8">
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
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {photographer.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                  <span className="font-bold text-lg">{photographer.rating}</span>
                </div>
                <span className="text-muted-foreground">({photographer.reviewCount} reviews)</span>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {photographer.specialties.map((spec) => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
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
            <h2 className="text-2xl font-bold font-headline mb-4">Portfolio</h2>
            <Carousel>
              <CarouselContent>
                {photographer.portfolio.map((imageId) => {
                  const image = PlaceHolderImages.find((img) => img.id === imageId);
                  return (
                    <CarouselItem key={imageId} className="md:basis-1/2">
                      <div className="p-1">
                        <Card>
                          <CardContent className="relative aspect-[3/2] p-0">
                            {image && <Image src={image.imageUrl} alt={image.description} data-ai-hint={image.imageHint} fill className="rounded-lg object-cover" />}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12" />
            </Carousel>
          </div>

          <Separator />
          
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Packages</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {photographer.packages.map((pkg) => (
                <Card key={pkg.id}>
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription className="text-xl font-bold text-primary">₹{pkg.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                    <ul className="space-y-2 text-sm">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                   <CardFooter>
                    <Link href="/book" className='w-full' passHref>
                        <Button variant="outline" className="w-full">
                            Select Package
                        </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <Separator />

          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Add-ons</h2>
            <div className="space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Users className="h-5 w-5 text-primary" /> Extra Photographer
                        </CardTitle>
                        <p className="text-lg font-bold text-primary">₹2000/hr</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Ideal for large events to ensure no moment is missed. A second professional will capture different angles and moments simultaneously.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                           <Video className="h-5 w-5 text-primary" /> Videographer
                        </CardTitle>
                        <p className="text-lg font-bold text-primary">₹3000/hr</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Get a stunning cinematic video of your event, edited to perfection. Perfect for weddings, corporate events, and special occasions.</p>
                    </CardContent>
                </Card>
            </div>
          </div>

          <Separator />

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
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
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

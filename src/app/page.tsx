import Image from 'next/image';
import { availablePhotographers, featuredPhotographers } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, Camera } from 'lucide-react';
import { PhotographerCard } from '@/components/photographer-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <section className="relative h-[60vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">Photographer Bulao</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-200">
            Capture your moments, instantly. Find and book professional photographers near you.
          </p>
          <div className="mt-8 w-full max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your location or event type..."
                className="h-14 rounded-full bg-white/90 pr-12 text-lg text-foreground"
              />
              <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" aria-label="Search">
                <Search />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-headline text-center">Featured Photographers</h2>
        <p className="text-muted-foreground text-center mt-2 mb-8">Top-rated professionals ready for your next event.</p>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredPhotographers.map((photographer) => (
              <CarouselItem key={photographer.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <PhotographerCard photographer={photographer} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </section>
      
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-headline text-center">Available Now</h2>
        <p className="text-muted-foreground text-center mt-2 mb-8">Ready to shoot! These photographers are available for instant booking.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availablePhotographers.map((photographer) => (
             <PhotographerCard key={photographer.id} photographer={photographer} />
          ))}
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline">How It Works</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">1. Find</h3>
                <p className="mt-2 text-muted-foreground">Search for photographers by location, specialty, and availability.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold">2. Book</h3>
                <p className="mt-2 text-muted-foreground">Schedule a shoot instantly or for a future date with secure in-app payments.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">3. Enjoy</h3>
                <p className="mt-2 text-muted-foreground">Enjoy your photoshoot and receive your beautifully edited photos in the app.</p>
              </div>
            </div>
        </div>
      </section>

    </div>
  );
}

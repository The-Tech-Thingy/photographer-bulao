import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, Camera, Building, Utensils, Briefcase, PartyPopper, CalendarCheck, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const photographyServices = [
  { name: 'Corporate Headshots', icon: Briefcase, imageId: 'service-headshot' },
  { name: 'Real Estate', icon: Building, imageId: 'service-real-estate' },
  { name: 'Food & Menu', icon: Utensils, imageId: 'service-food' },
  { name: 'Private Events', icon: PartyPopper, imageId: 'service-event' },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      <section className="relative h-[50vh] md:h-[60vh] w-full">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end text-center p-4 pb-12 md:pb-24">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
            Mumbai's Top Photographers, On-Demand
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-xl text-muted-foreground">
            Book a service, and we'll assign a pre-vetted professional photographer for your shoot. Simple as that.
          </p>
          <div className="mt-6 md:mt-8 w-full max-w-md md:max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="e.g. Wedding photographer in Bandra"
                className="h-12 md:h-14 rounded-full bg-background pr-12 text-base md:text-lg text-foreground focus:ring-primary/50 focus:ring-2"
              />
              <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 rounded-full" aria-label="Search">
                <Search className="h-5 w-5"/>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-16 md:-mt-24 z-20">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-6 md:mb-8">Book by Service</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {photographyServices.map((service) => {
            const serviceImage = PlaceHolderImages.find((img) => img.id === service.imageId);
            return (
              <Link href="#" key={service.name}>
                <Card className="overflow-hidden group hover:shadow-primary/20 transition-all duration-300">
                  <CardContent className="p-0 relative">
                    {serviceImage && (
                      <Image
                        src={serviceImage.imageUrl}
                        alt={serviceImage.description}
                        data-ai-hint={serviceImage.imageHint}
                        width={400}
                        height={400}
                        className="object-cover w-full aspect-square transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2 text-center">
                      <service.icon className="w-8 h-8 text-white mb-2"/>
                      <h3 className="text-base md:text-xl font-semibold text-white">{service.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      
      <section className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">The Uber for Photographers</h2>
             <p className="text-muted-foreground text-center mt-2 mb-8 max-w-2xl mx-auto">Get stunning photos in just a few clicks. Here's how we make it easy for you.</p>
            <div className="mt-12 grid gap-10 md:gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background">
                  <Search className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold">1. Select a Service</h3>
                <p className="mt-2 text-muted-foreground">Choose the type of photography you need, from events to portraits.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background">
                  <CalendarCheck className="h-8 w-8 md:h-10 md:w-10 text-primary"/>
                </div>
                <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold">2. Schedule Your Shoot</h3>
                <p className="mt-2 text-muted-foreground">Pick a date, time, and location that works for you. Book and pay in seconds.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background">
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold">3. Get a Pro Assigned</h3>
                <p className="mt-2 text-muted-foreground">We'll assign a vetted, professional photographer to your booking. Guaranteed.</p>
              </div>
            </div>
        </div>
      </section>

    </div>
  );
}

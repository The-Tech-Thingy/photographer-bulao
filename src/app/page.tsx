import Image from 'next/image';
import { availablePhotographers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, Camera, Building, Utensils, Briefcase, PartyPopper } from 'lucide-react';
import { PhotographerCard } from '@/components/photographer-card';
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
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
            From corporate headshots to personal events, book pre-vetted professional photographers in minutes.
          </p>
          <div className="mt-8 w-full max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="e.g. Wedding photographer in Bandra"
                className="h-14 rounded-full bg-background pr-12 text-lg text-foreground focus:ring-primary/50 focus:ring-2"
              />
              <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" aria-label="Search">
                <Search />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-16 md:-mt-24 z-20">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8">Photography Services in Mumbai</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                      <service.icon className="w-8 h-8 md:w-10 md:h-10 text-white mb-2"/>
                      <h3 className="text-lg md:text-xl font-semibold text-white">{service.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      
      <section className="container mx-auto px-4 mt-8 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center">Available Now in Mumbai</h2>
        <p className="text-muted-foreground text-center mt-2 mb-8">Ready to shoot! These photographers are available for instant booking.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availablePhotographers.slice(0, 4).map((photographer) => (
             <PhotographerCard key={photographer.id} photographer={photographer} />
          ))}
        </div>
        <div className="text-center mt-8">
            <Button size="lg" variant="outline">
                See all available photographers
            </Button>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Simple, Fast, and Reliable</h2>
             <p className="text-muted-foreground text-center mt-2 mb-8 max-w-2xl mx-auto">Get stunning photos in just a few clicks. Here's how we make it easy for you.</p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">1. Find Your Photographer</h3>
                <p className="mt-2 text-muted-foreground">Search by specialty and location in Mumbai. View portfolios and reviews to find your perfect match.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold">2. Book Instantly</h3>
                <p className="mt-2 text-muted-foreground">Select a package, choose a date and time, and confirm your booking with our secure payment system.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background">
                  <Camera className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">3. Enjoy Your Photos</h3>
                <p className="mt-2 text-muted-foreground">Meet your photographer and have a great session. Receive and review your high-quality photos right in the app.</p>
              </div>
            </div>
        </div>
      </section>

    </div>
  );
}

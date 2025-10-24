import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Building, Utensils, PartyPopper, Heart, User, Users, Shirt } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { LocationSearch } from '@/components/location-search';
import { ServiceSearch } from '@/components/service-search';

const photographyServices = [
  { name: 'Corporate Headshots', icon: 'Briefcase', imageId: 'service-headshot' },
  { name: 'Real Estate', icon: 'Building', imageId: 'service-real-estate' },
  { name: 'Food & Menu', icon: 'Utensils', imageId: 'service-food' },
  { name: 'Private Events', icon: 'PartyPopper', imageId: 'service-event' },
  { name: 'Wedding', icon: 'Heart', imageId: 'service-wedding'},
  { name: 'Portraits', icon: 'User', imageId: 'service-portraits'},
  { name: 'Family', icon: 'Users', imageId: 'service-family'},
  { name: 'Fashion', icon: 'Shirt', imageId: 'service-fashion'},
];

const trustedByLogos = [
    { id: 'logo-1', alt: 'Company A', url: 'https://picsum.photos/seed/logoA/140/40' },
    { id: 'logo-2', alt: 'Company B', url: 'https://picsum.photos/seed/logoB/140/40' },
    { id: 'logo-3', alt: 'Company C', url: 'https://picsum.photos/seed/logoC/140/40' },
    { id: 'logo-4', alt: 'Company D', url: 'https://picsum.photos/seed/logoD/140/40' },
    { id: 'logo-5', alt: 'Company E', url: 'https://picsum.photos/seed/logoE/140/40' },
]

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const servicesToShow = photographyServices.slice(0, 8);

  return (
    <>
      <section className="relative h-[60vh] md:h-[70vh] w-full">
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
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
            Mumbai's Top Photographers, On-Demand
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-xl text-muted-foreground">
            Book a service, and we'll assign a pre-vetted professional photographer for your shoot. Simple as that.
          </p>
          <div className="mt-6 md:mt-8 w-full max-w-2xl flex flex-col sm:flex-row gap-2 items-center">
            <LocationSearch />
            <ServiceSearch />
            <Link href="/book" passHref>
                 <Button size="lg" className="h-12 md:h-14 rounded-full px-8 w-full sm:w-auto font-bold text-base">Book Now</Button>
            </Link>
        </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-16 md:-mt-24 z-20" aria-labelledby="trusted-by-heading">
        <h2 id="trusted-by-heading" className="text-sm font-semibold uppercase text-muted-foreground text-center mb-6">Trusted by businesses in Mumbai</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-4">
            {trustedByLogos.map(logo => (
                <Image key={logo.id} src={logo.url} alt={logo.alt} width={120} height={30} className="grayscale opacity-60" />
            ))}
        </div>
      </section>
      
      <section className="container mx-auto px-4 mt-8 md:mt-16" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-2xl md:text-3xl font-bold font-headline text-center mb-6 md:mb-8">Book by Service</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {servicesToShow.map((service) => {
            const serviceImage = PlaceHolderImages.find((img) => img.id === service.imageId);
            const Icon = { Briefcase, Building, Utensils, PartyPopper, Heart, User, Users, Shirt }[service.icon as 'Briefcase' | 'Building' | 'Utensils' | 'PartyPopper' | 'Heart' | 'User' | 'Users' | 'Shirt']
            return (
              <Link href={`/book?service=${encodeURIComponent(service.name)}`} key={service.name}>
                <Card className="overflow-hidden group hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 border-0 rounded-lg">
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
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2 text-center transition-colors group-hover:bg-black/40">
                      {Icon && <Icon className="w-8 h-8 text-white mb-2"/>}
                      <h3 className="text-base md:text-xl font-semibold text-white">{service.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      
      <section className="bg-muted py-12 md:py-20" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4 text-center">
            <h2 id="how-it-works-heading" className="text-2xl md:text-3xl font-bold font-headline">The Uber for Photographers</h2>
             <p className="text-muted-foreground text-center mt-2 mb-8 max-w-2xl mx-auto">Get stunning photos in just a few clicks. A guaranteed professional photographer will be assigned for your work.</p>
            <div className="mt-12 grid gap-10 md:gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background shadow-md mb-4">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="mt-2 text-lg md:text-xl font-semibold">Select a Service</h3>
                <p className="mt-1 text-muted-foreground max-w-xs">Choose the type of photography you need, from events to portraits.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background shadow-md mb-4">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h3 className="mt-2 text-lg md:text-xl font-semibold">Schedule Your Shoot</h3>
                <p className="mt-1 text-muted-foreground max-w-xs">Pick a date, time, and location that works for you. Book and pay in seconds.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background shadow-md mb-4">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h3 className="mt-2 text-lg md:text-xl font-semibold">Get a Pro Assigned</h3>
                <p className="mt-1 text-muted-foreground max-w-xs">We'll assign a vetted, professional photographer to your booking. Guaranteed.</p>
              </div>
            </div>
        </div>
      </section>

    </>
  );
}

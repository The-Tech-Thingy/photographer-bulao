import { BookingForm } from '@/components/booking-form';
import { Briefcase } from 'lucide-react';

export default function BookPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
            <Briefcase className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-wider">Book a Photographer</h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl">
          Complete the steps below and we'll assign a pre-vetted, professional photographer for your shoot.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}

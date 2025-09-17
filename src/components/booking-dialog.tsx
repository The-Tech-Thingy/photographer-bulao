'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Photographer, Package } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, Package as PackageIcon, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface BookingDialogProps {
  children: React.ReactNode;
  photographer: Photographer;
  selectedPackage?: Package;
}

const timeSlots = ['09:00', '11:00', '13:00', '15:00', '17:00'];

export function BookingDialog({ children, photographer, selectedPackage }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!date || !time) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Information',
        description: 'Please select a date and time.',
      });
      return;
    }

    // In a real app, this would trigger a server action to create a booking
    console.log({
      photographerId: photographer.id,
      packageId: selectedPackage?.id,
      date,
      time,
    });
    setStep(3); // Move to confirmation step
  };

  const resetAndClose = () => {
    setOpen(false);
    // Reset state after a short delay to allow dialog to close
    setTimeout(() => {
      setStep(1);
      setDate(new Date());
      setTime(undefined);
    }, 300);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Schedule your photoshoot</DialogTitle>
              <DialogDescription>Select a date and time to book {photographer.name}.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> Select Date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Select Time</h3>
                <RadioGroup value={time} onValueChange={setTime} className="space-y-2">
                  {timeSlots.map((slot) => (
                    <Label
                      key={slot}
                      className={cn(
                        "flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent",
                        time === slot && "bg-accent border-primary"
                      )}
                    >
                      <RadioGroupItem value={slot} id={slot} />
                      <span>{slot}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetAndClose}>Cancel</Button>
              <Button onClick={() => setStep(2)} disabled={!date || !time}>Next</Button>
            </DialogFooter>
          </>
        );
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Confirm your booking</DialogTitle>
              <DialogDescription>Review the details before confirming your booking.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="rounded-md border p-4">
                    <h4 className="font-semibold">Photographer</h4>
                    <p className="text-muted-foreground">{photographer.name}</p>
                </div>
                 {selectedPackage && (
                <div className="rounded-md border p-4">
                    <h4 className="font-semibold flex items-center gap-2"><PackageIcon className="w-4 h-4"/> Package</h4>
                    <p className="text-muted-foreground">{selectedPackage.name} - ${selectedPackage.price}</p>
                </div>
                )}
                <div className="rounded-md border p-4">
                    <h4 className="font-semibold flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> Date & Time</h4>
                    <p className="text-muted-foreground">{date ? format(date, "PPP") : ''} at {time}</p>
                </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleBooking}>Confirm & Pay</Button>
            </DialogFooter>
          </>
        );
        case 3:
            return (
                 <>
                    <DialogHeader className="items-center text-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <DialogTitle className="text-2xl">Booking Confirmed!</DialogTitle>
                        <DialogDescription>
                            Your photoshoot with {photographer.name} is scheduled. You can view details in "My Bookings".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-center">
                        <p className="font-semibold">Date:</p>
                        <p className="text-muted-foreground">{date ? format(date, "PPP") : ''} at {time}</p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button onClick={resetAndClose}>Done</Button>
                    </DialogFooter>
                </>
            );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}

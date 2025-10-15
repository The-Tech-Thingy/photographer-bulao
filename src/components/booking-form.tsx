'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Briefcase, Building, Utensils, PartyPopper, ArrowLeft, CheckCircle, Clock, Image as ImageIcon, Check, MapPin, CreditCard, User, Truck, Sparkles, Calendar as CalendarIcon, Video, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from './ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from './ui/textarea';
import { handleRecommendation } from '@/app/recommend/actions';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Checkbox } from './ui/checkbox';

const services = [
  { name: 'Corporate Headshots', icon: Briefcase },
  { name: 'Real Estate', icon: Building },
  { name: 'Food & Menu', icon: Utensils },
  { name: 'Private Events', icon: PartyPopper },
];

const packages = [
    { id: 'basic', name: 'Basic', price: 2000, description: 'Best for simple needs. Price is per hour.', features: ['Standard Gear', '50 Edited Photos', '5-day Delivery'] },
    { id: 'standard', name: 'Standard', price: 3000, description: 'Most popular choice. Price is per hour.', features: ['Pro Gear', '100 Edited Photos', '3-day Delivery', 'Online Gallery'] },
    { id: 'premium', name: 'Premium', price: 5000, description: 'For the highest quality. Price is per hour.', features: ['Advanced Gear + Lighting', '250 Edited Photos', '2-day Delivery', 'Online Gallery & Prints'] },
]

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const ADDON_PRICES = {
    extraPhotographer: 2000,
    videographer: 3000
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    location: '',
    date: new Date(),
    time: '',
    duration: '2',
    delivery: 'edited',
    package: 'standard',
    extraPhotographer: false,
    videographer: false,
  });
  const [aiService, setAiService] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const serviceFromUrl = searchParams.get('service');
    if (serviceFromUrl) {
      handleChange('service', serviceFromUrl);
      setStep(2);
    }
  }, [searchParams]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleConfirmBooking = () => {
    toast({
        title: "Booking Confirmed!",
        description: "A professional photographer has been assigned to your booking.",
        variant: "default",
    })
    nextStep();
  }

  const onAiRecommendation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await handleRecommendation(null, formData);
    if (result.error) {
        toast({
            title: "An error occurred",
            description: result.error,
            variant: "destructive",
        })
    } else {
        setAiService(result.recommendedPackages);
    }
  }

  const selectAiService = () => {
    handleChange('service', 'AI Recommended');
    nextStep();
  }

  const progress = (step / 6) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">Select a Service</TabsTrigger>
                    <TabsTrigger value="ai">Use AI Assistant</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                     <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                        {services.map((service) => (
                        <Card
                            key={service.name}
                            className={`p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${formData.service === service.name ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}
                            onClick={() => { handleChange('service', service.name); nextStep(); }}
                        >
                            <service.icon className="w-8 h-8 mb-2 text-primary" />
                            <p className="font-semibold text-sm">{service.name}</p>
                        </Card>
                        ))}
                    </CardContent>
                </TabsContent>
                <TabsContent value="ai">
                    <CardContent className="pt-6">
                        <form onSubmit={onAiRecommendation} className="space-y-4">
                            <Textarea
                                name="userInput"
                                placeholder="e.g., 'I need a photographer for my small, outdoor wedding in the afternoon. I prefer a candid, photojournalistic style. Around 50 guests.'"
                                rows={5}
                                required
                                />
                            <Button type="submit" className="w-full">
                                Analyze My Need
                            </Button>
                        </form>
                        {aiService && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary"/>
                                    Suggested Service
                                </h3>
                                <Card className="bg-muted mt-2">
                                    <CardContent className="p-4">
                                        <div
                                            className="prose prose-sm max-w-none text-foreground dark:prose-invert"
                                            dangerouslySetInnerHTML={{ __html: aiService.replace(/\n/g, '<br />')}}
                                        />
                                         <Button onClick={selectAiService} className="w-full mt-4">
                                            Proceed with this Service
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </TabsContent>
            </Tabs>
        );
      case 2:
        return (
            <>
                <CardHeader>
                    <CardTitle>Shoot Details</CardTitle>
                    <CardDescription>Where and when will the photoshoot take place?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="location"><MapPin className="inline-block mr-2"/>Location</Label>
                        <Input id="location" placeholder="e.g., Bandra West, Mumbai" value={formData.location} onChange={(e) => handleChange('location', e.target.value)} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date"><CalendarIcon className="inline-block mr-2"/>Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formData.date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => handleChange('date', date)}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time"><Clock className="inline-block mr-2"/>Time</Label>
                            <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                                <SelectTrigger id="time">
                                    <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duration"><Clock className="inline-block mr-2"/>Duration (hours)</Label>
                        <Select value={formData.duration} onValueChange={(value) => handleChange('duration', value)}>
                            <SelectTrigger id="duration">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(8)].map((_, i) => (
                                <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1} hour{i > 0 ? 's' : ''}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label><ImageIcon className="inline-block mr-2"/>Photo Delivery</Label>
                        <RadioGroup defaultValue="edited" value={formData.delivery} onValueChange={(value) => handleChange('delivery', value)} className="flex gap-4">
                            <Label className={`flex-1 p-4 border rounded-md cursor-pointer ${formData.delivery === 'raw' ? 'border-primary' : ''}`}>
                                <RadioGroupItem value="raw" id="r1" className="sr-only" />
                                <h4 className="font-semibold">Raw Photos</h4>
                                <p className="text-sm text-muted-foreground">Unedited, original files.</p>
                            </Label>
                            <Label className={`flex-1 p-4 border rounded-md cursor-pointer ${formData.delivery === 'edited' ? 'border-primary' : ''}`}>
                                <RadioGroupItem value="edited" id="r2" className="sr-only" />
                                <h4 className="font-semibold">Edited Photos</h4>
                                <p className="text-sm text-muted-foreground">Professionally edited and color graded.</p>
                             </Label>
                        </RadioGroup>
                    </div>
                </CardContent>
            </>
        );
       case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Select a Package</CardTitle>
              <CardDescription>The final price will be calculated based on the duration you selected.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <Card key={pkg.id} className={`flex flex-col cursor-pointer transition-all ${formData.package === pkg.id ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`} onClick={() => handleChange('package', pkg.id)}>
                    <CardHeader>
                        <CardTitle>{pkg.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">₹{pkg.price}<span className="text-sm font-normal text-muted-foreground">/hr</span></CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className='text-sm text-muted-foreground mb-3'>{pkg.description}</p>
                        <ul className="space-y-2 text-sm">
                        {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                         <div className={`w-full flex justify-center items-center h-6`}>
                            {formData.package === pkg.id && <CheckCircle className="text-primary" />}
                        </div>
                    </CardFooter>
                </Card>
              ))}
            </CardContent>
          </>
        );
    case 4:
        return (
            <>
            <CardHeader>
                <CardTitle>Add-on Services</CardTitle>
                <CardDescription>Enhance your photoshoot experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className={`flex items-start space-x-3 p-4 border rounded-md  ${formData.extraPhotographer ? 'border-primary' : ''}`}>
                    <Checkbox id="extra-photographer" checked={formData.extraPhotographer} onCheckedChange={(checked) => handleChange('extraPhotographer', checked)} className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                        <label htmlFor="extra-photographer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                            <Users className="inline-block mr-2" /> Extra Photographer
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Ideal for large events to ensure no moment is missed. (₹{ADDON_PRICES.extraPhotographer} per hour)
                        </p>
                    </div>
                </div>
                <div className={`flex items-start space-x-3 p-4 border rounded-md  ${formData.videographer ? 'border-primary' : ''}`}>
                    <Checkbox id="videographer" checked={formData.videographer} onCheckedChange={(checked) => handleChange('videographer', checked)} className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                         <label htmlFor="videographer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                            <Video className="inline-block mr-2" /> Videographer/Cinematographer
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Get a stunning cinematic video of your event. (₹{ADDON_PRICES.videographer} per hour)
                        </p>
                    </div>
                </div>
            </CardContent>
            </>
        );
      case 5:
        const selectedPkg = packages.find(p => p.id === formData.package);
        const duration = parseInt(formData.duration);
        const packagePrice = selectedPkg ? selectedPkg.price * duration : 0;
        
        let total = packagePrice;

        if (formData.extraPhotographer) {
            total += ADDON_PRICES.extraPhotographer * duration;
        }
        if (formData.videographer) {
            total += ADDON_PRICES.videographer * duration;
        }

        return (
          <>
            <CardHeader>
              <CardTitle>Confirm Booking</CardTitle>
              <CardDescription>Review your details and make a partial payment to confirm.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg space-y-4 bg-muted/50">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-semibold">{formData.service}</span>
                    </div>
                    <Separator/>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-semibold">{formData.location}</span>
                    </div>
                    <Separator/>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Date & Time</span>
                        <span className="font-semibold">{formData.date ? format(formData.date, "PPP") : 'Not set'} at {formData.time || 'Not set'}</span>
                    </div>
                    <Separator/>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{formData.duration} hour(s)</span>
                    </div>
                    <Separator/>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-semibold capitalize">{formData.delivery} Photos</span>
                    </div>
                    <Separator/>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Package</span>
                        <span className="font-semibold capitalize">{selectedPkg?.name} (₹{packagePrice})</span>
                    </div>
                     { (formData.extraPhotographer || formData.videographer) && <Separator/> }
                     { formData.extraPhotographer && (
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Extra Photographer</span>
                            <span className="font-semibold">₹{ADDON_PRICES.extraPhotographer * duration}</span>
                        </div>
                     )}
                     { formData.videographer && (
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Videographer</span>
                            <span className="font-semibold">₹{ADDON_PRICES.videographer * duration}</span>
                        </div>
                     )}
                     <Separator/>
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-primary">₹{total}</span>
                    </div>
                </div>
                <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">Partial Advance Payment</h4>
                     <p className="text-sm text-muted-foreground mb-4">Pay 25% now to confirm your booking. The rest is due after photo delivery.</p>
                     <p className="text-2xl font-bold text-center">₹{total * 0.25}</p>
                </div>
            </CardContent>
          </>
        );
        case 6:
            return (
                <div className='flex flex-col items-center text-center p-8'>
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h2 className='text-2xl font-bold font-headline mb-2'>Booking Confirmed!</h2>
                    <p className='text-muted-foreground max-w-md mb-6'>A professional photographer has been assigned. You can now track their ETA and see your final photos in the bookings section.</p>
                    <div className='p-6 border rounded-lg w-full max-w-sm space-y-4 bg-muted/50'>
                         <div className="flex items-center gap-4">
                            <div className='p-3 bg-background rounded-full'>
                                <User className="w-6 h-6 text-primary"/>
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground'>Assigned Photographer</p>
                                <p className='font-bold'>Priya Singh</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-4">
                            <div className='p-3 bg-background rounded-full'>
                                <Truck className="w-6 h-6 text-primary"/>
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground'>ETA</p>
                                <p className='font-bold'>Arriving in 15 minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <Progress value={progress} className="w-full h-2 mb-4" />
        {step === 1 && (
            <>
                <CardTitle>Select a Service</CardTitle>
                <CardDescription>What type of photoshoot are you looking for?</CardDescription>
            </>
        )}
      </CardHeader>
      {renderStep()}
      <CardFooter className="flex justify-between mt-6">
        {step > 1 && step < 6 && (
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        )}
        {step > 1 && step < 5 && (
            <Button onClick={nextStep} disabled={ (step === 2 && (!formData.location || !formData.date || !formData.time)) }>
                Next
            </Button>
        )}
        {step === 5 && (
            <Button className='w-full' size="lg" onClick={handleConfirmBooking}>
                <CreditCard className="mr-2 h-4 w-4" /> Pay & Confirm Booking
            </Button>
        )}
        {step === 6 && (
            <div className='w-full flex justify-center'>
                <Button onClick={() => window.location.href = '/bookings'}>
                    Go to My Bookings
                </Button>
            </div>
        )}
      </CardFooter>
    </Card>
  );
}

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check, Search, MapPin, LocateFixed } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

const locations = [
    { name: 'Andheri', group: 'Suburbs' },
    { name: 'Bandra', group: 'Suburbs' },
    { name: 'Juhu', group: 'Suburbs' },
    { name: 'Dadar', group: 'Central' },
    { name: 'Colaba', group: 'South Mumbai' },
    { name: 'Marine Drive', group: 'South Mumbai' },
    { name: 'Thane', group: 'Metropolitan Region' },
    { name: 'Navi Mumbai', group: 'Metropolitan Region' },
];

export function LocationSearch() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSelect = (currentValue: string) => {
    const locationName = currentValue.toLowerCase() === value ? '' : currentValue;
    setValue(locationName);
    setOpen(false);
    if (locationName) {
      router.push(`/book?location=${encodeURIComponent(locationName)}`);
    }
  };

  const handleAutoDetect = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd use a reverse geocoding service here
        setValue('My Current Location');
        setOpen(false);
        toast({ title: 'Location detected!', description: 'Using your current location.' });
        router.push(`/book?location=current`);
      },
      (error) => {
        toast({
          title: 'Error',
          description: 'Could not access your location. Please enable location services.',
          variant: 'destructive',
        });
      }
    );
  };

  const groupedLocations = locations.reduce((acc, loc) => {
    if (!acc[loc.group]) {
      acc[loc.group] = [];
    }
    acc[loc.group].push(loc);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-12 md:h-14 w-full justify-between rounded-full bg-background/80 pl-12 text-base text-muted-foreground focus:ring-primary/50 focus:ring-2 backdrop-blur-sm hover:bg-background/90"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {value
            ? locations.find((loc) => loc.name.toLowerCase() === value.toLowerCase())?.name || 'My Current Location'
            : 'Search for a location...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl">
        <Command>
          <CommandInput placeholder="Search for a location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
                <CommandItem onSelect={handleAutoDetect} className="flex items-center gap-2 cursor-pointer">
                    <LocateFixed className="h-5 w-5 text-primary"/>
                    <span>Auto-detect my current location</span>
                </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            {Object.entries(groupedLocations).map(([group, locs]) => (
                <CommandGroup key={group} heading={group}>
                    {locs.map((loc) => {
                        return (
                            <CommandItem
                            key={loc.name}
                            value={loc.name}
                            onSelect={handleSelect}
                            className="flex items-center gap-2"
                            >
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span>{loc.name}</span>
                                <Check
                                    className={cn(
                                    'ml-auto h-4 w-4',
                                    value.toLowerCase() === loc.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

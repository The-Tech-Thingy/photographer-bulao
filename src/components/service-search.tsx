'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Search, Camera } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const services = [
    { name: 'Corporate Headshots', group: 'Business' },
    { name: 'Product Photography', group: 'Business' },
    { name: 'Real Estate', group: 'Business' },
    { name: 'Food & Menu', group: 'Business' },
    { name: 'Wedding', group: 'Events' },
    { name: 'Private Events', group: 'Events' },
    { name: 'Concerts & Festivals', group: 'Events' },
    { name: 'Portraits', group: 'Personal' },
    { name: 'Family Photos', group: 'Personal' },
    { name: 'Maternity & Newborn', group: 'Personal' },
    { name: 'Fashion & Editorial', group: 'Creative' },
    { name: 'Lifestyle', group: 'Creative' },
    { name: 'Street Photography', group: 'Creative' },
];

export function ServiceSearch() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (currentValue: string) => {
    const serviceName = currentValue.toLowerCase() === value ? '' : currentValue;
    setValue(serviceName);
    setOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    if (serviceName) {
      params.set('service', serviceName);
    } else {
        params.delete('service');
    }
    router.push(`/book?${params.toString()}`);
  };

  const groupedServices = services.reduce((acc, srv) => {
    if (!acc[srv.group]) {
      acc[srv.group] = [];
    }
    acc[srv.group].push(srv);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-12 md:h-14 w-full justify-between rounded-full bg-background/80 pl-12 text-base text-muted-foreground focus:ring-primary/50 focus:ring-2 backdrop-blur-sm hover:bg-background/90"
        >
          <Camera className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {value
            ? services.find((srv) => srv.name.toLowerCase() === value.toLowerCase())?.name
            : 'Or select a service...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl">
        <Command>
          <CommandInput placeholder="Search for a service..." />
          <CommandList>
            <CommandEmpty>No service found.</CommandEmpty>
            {Object.entries(groupedServices).map(([group, srvs]) => (
                <CommandGroup key={group} heading={group}>
                    {srvs.map((srv) => {
                        return (
                            <CommandItem
                            key={srv.name}
                            value={srv.name}
                            onSelect={(currentValue) => handleSelect(currentValue)}
                            className="flex items-center gap-2"
                            >
                                <span>{srv.name}</span>
                                <Check
                                    className={cn(
                                    'ml-auto h-4 w-4',
                                    value.toLowerCase() === srv.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
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

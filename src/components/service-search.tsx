'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check, Search, Briefcase, Building, Utensils, PartyPopper } from 'lucide-react';

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

const iconMap = {
    Briefcase,
    Building,
    Utensils,
    PartyPopper
}

interface Service {
    name: string;
    icon: keyof typeof iconMap;
}

interface ServiceSearchProps {
  services: Service[];
}

export function ServiceSearch({ services }: ServiceSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const router = useRouter();

  const handleSelect = (currentValue: string) => {
    const serviceName = currentValue === value ? '' : currentValue;
    setValue(serviceName);
    setOpen(false);
    if (serviceName) {
        router.push(`/book?service=${encodeURIComponent(serviceName)}`);
    }
  };

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
            ? services.find((service) => service.name.toLowerCase() === value)?.name
            : 'Wedding photographer in Bandra'}
          
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl">
        <Command>
          <CommandInput placeholder="Search for a service..." />
          <CommandList>
            <CommandEmpty>No service found.</CommandEmpty>
            <CommandGroup>
              {services.map((service) => {
                const Icon = iconMap[service.icon];
                return (
                    <CommandItem
                    key={service.name}
                    value={service.name}
                    onSelect={handleSelect}
                    className="flex items-center gap-2"
                    >
                    {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                    <span>{service.name}</span>
                    <Check
                        className={cn(
                        'ml-auto h-4 w-4',
                        value === service.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                    </CommandItem>
                )
            })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

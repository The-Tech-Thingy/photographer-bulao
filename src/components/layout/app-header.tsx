'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, Briefcase, Bell, CheckCheck, Tag } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/bookings', label: 'My Bookings' },
  { href: '/blog', label: 'Blog' },
  { href: '/recommend', label: 'AI Assistant' },
  { href: '/chat', label: 'Chat' },
];

export function AppHeader() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-4">
           <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-10 w-auto" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">Photographer Bulao</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2">
               <Logo className="h-10 w-auto" />
              <span className="font-bold font-headline text-lg">Photographer Bulao</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
               <div className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'text-lg font-medium transition-colors hover:text-primary',
                            pathname === link.href ? 'text-primary' : 'text-foreground'
                        )}
                        >
                        {link.label}
                        </Link>
                    ))}
               </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
            <NavLinks />
            <div className="flex items-center gap-2">
                <Link href="/book" passHref>
                    <Button>
                        <Briefcase className="mr-2 h-4 w-4"/>
                        Book Now
                    </Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className='relative'>
                        <Bell className="h-5 w-5" />
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">2</Badge>
                        <span className="sr-only">Notifications</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex items-start gap-3">
                                <CheckCheck className="text-green-500 mt-1"/>
                                <div>
                                    <p className="font-semibold">Booking Confirmed</p>
                                    <p className="text-xs text-muted-foreground">Your shoot with Jane Doe is confirmed for Aug 15.</p>
                                </div>
                            </DropdownMenuItem>
                             <DropdownMenuItem className="flex items-start gap-3">
                                <Tag className="text-primary mt-1"/>
                                <div>
                                    <p className="font-semibold">Special Offer!</p>
                                    <p className="text-xs text-muted-foreground">Get 20% off your next event photoshoot.</p>
                                </div>
                            </DropdownMenuItem>
                             <DropdownMenuItem className="flex items-start gap-3">
                                <User className="text-blue-500 mt-1"/>
                                <div>
                                    <p className="font-semibold">Profile Updated</p>
                                    <p className="text-xs text-muted-foreground">You successfully changed your password.</p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-sm text-primary hover:!text-primary">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User Profile</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Logout</Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </div>
    </header>
  );
}

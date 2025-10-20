
'use client';

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bookings, completedBookingsWithGalleries } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle, Settings, User as UserIcon, Camera, Download, Share2, Maximize } from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"


export default function DashboardPage() {
    const user = {
        name: "Sofia Davis",
        email: "sofia.davis@example.com",
        avatar: "https://picsum.photos/seed/user-avatar/100/100"
    }

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const upcomingBookings = bookings.filter((b) => b.status === 'Upcoming');
    const pastBookings = bookings.filter((b) => b.status !== 'Upcoming');

    const BookingTable = ({ bookings }: { bookings: typeof pastBookings | typeof upcomingBookings }) => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photographer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.photographerName}</TableCell>
                <TableCell>{booking.package}</TableCell>
                <TableCell>{booking.date} at {booking.time}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === 'Completed'
                        ? 'default'
                        : booking.status === 'Cancelled'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className={cn(booking.status === 'Completed' && 'bg-green-600')}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/photographers/${booking.photographerId}`}>
                            {booking.status === 'Completed' ? 'Book Again' : 'View Profile'}
                        </Link>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Client Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                <p className="text-xs text-muted-foreground">sessions scheduled</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Shoots</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{pastBookings.filter(b => b.status === 'Completed').length}</div>
                 <p className="text-xs text-muted-foreground">memories captured</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{completedBookingsWithGalleries.reduce((acc, b) => acc + (b.gallery?.length || 0), 0)}</div>
                 <p className="text-xs text-muted-foreground">photos delivered</p>
            </CardContent>
        </Card>
      </section>

      <section>
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile"><UserIcon className="mr-2" />My Profile</TabsTrigger>
            <TabsTrigger value="gallery"><Camera className="mr-2" />My Gallery</TabsTrigger>
            <TabsTrigger value="upcoming"><Calendar className="mr-2"/>Upcoming</TabsTrigger>
            <TabsTrigger value="history"><CheckCircle className="mr-2"/>History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>View and edit your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xl font-semibold">{user.name}</p>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                </CardContent>
                <CardContent className="border-t pt-6">
                     <Button asChild variant="outline">
                        <Link href="/settings">
                            <Settings className="mr-2"/>
                            Manage Account Settings
                        </Link>
                    </Button>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Your Photo Galleries</CardTitle>
                <CardDescription>View, download, and share photos from your completed shoots.</CardDescription>
              </CardHeader>
              <CardContent>
                {completedBookingsWithGalleries.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {completedBookingsWithGalleries.map((booking) => (
                      <AccordionItem value={booking.id} key={booking.id}>
                        <AccordionTrigger>
                          <div className="flex flex-col text-left">
                            <span className="font-semibold">{booking.package} with {booking.photographerName}</span>
                            <span className="text-sm text-muted-foreground">{booking.date}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {booking.gallery?.map((imageId) => {
                              const image = PlaceHolderImages.find(p => p.id === imageId);
                              if (!image) return null;
                              return (
                                <div key={image.id} className="relative group aspect-square">
                                  <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    data-ai-hint={image.imageHint}
                                    fill
                                    className="object-cover rounded-md"
                                  />
                                  <div 
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                    onClick={() => setSelectedImage(image.imageUrl)}
                                  >
                                    <Maximize className="text-white h-8 w-8" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground text-center py-8">You have no photos from completed bookings yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled photoshoots.</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <BookingTable bookings={upcomingBookings} />
                ) : (
                  <p className="text-muted-foreground text-center py-8">You have no upcoming bookings.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>Your past and cancelled photoshoots.</CardDescription>
              </CardHeader>
              <CardContent>
                {pastBookings.length > 0 ? (
                  <BookingTable bookings={pastBookings} />
                ) : (
                  <p className="text-muted-foreground text-center py-8">You have no past bookings.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
            {selectedImage && (
                <div>
                    <Image
                        src={selectedImage}
                        alt="Selected gallery image"
                        width={1200}
                        height={800}
                        className="rounded-t-lg object-contain"
                    />
                    <div className="p-4 flex justify-end gap-2 border-t bg-muted">
                        <Button variant="outline"><Share2 className="mr-2"/>Share</Button>
                        <Button><Download className="mr-2"/>Download</Button>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

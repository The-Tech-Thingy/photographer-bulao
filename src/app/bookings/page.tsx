import { bookings } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BookingsPage() {
  const upcomingBookings = bookings.filter((b) => b.status === 'Upcoming');
  const pastBookings = bookings.filter((b) => b.status !== 'Upcoming');

  const BookingTable = ({ bookings }: { bookings: typeof pastBookings }) => (
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
                <Link href={`/photographers/${booking.photographerId}`}>
                    <Button variant="ghost" size="sm">
                        {booking.status === 'Completed' ? 'Book Again' : 'View Profile'}
                    </Button>
                </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">My Bookings</h1>

      <div className="space-y-8">
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
      </div>
    </div>
  );
}

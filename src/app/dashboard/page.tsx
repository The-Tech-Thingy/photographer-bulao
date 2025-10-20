
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { bookings } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle, Edit, Save, User as UserIcon, Settings, Bell, KeySquare } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    const user = {
        name: "Sofia Davis",
        email: "sofia.davis@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://picsum.photos/seed/user-avatar/100/100"
    }

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

      <section className="grid gap-4 md:grid-cols-2 mb-8">
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
      </section>

      <section>
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile"><UserIcon className="mr-2" />My Profile</TabsTrigger>
            <TabsTrigger value="upcoming"><Calendar className="mr-2"/>Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="history"><CheckCircle className="mr-2"/>Booking History</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="mr-2"/>Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline"><Edit className="mr-2"/>Change Photo</Button>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                </CardContent>
                <CardContent className="border-t pt-6">
                     <Button><Save className="mr-2"/>Save Changes</Button>
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

          <TabsContent value="settings">
              <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your notification and security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center"><Bell className="mr-2"/>Notifications</h3>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates on bookings and promotions.</p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">Get reminders for your upcoming shoots.</p>
                            </div>
                            <Switch id="sms-notifications" />
                        </div>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-semibold flex items-center"><KeySquare className="mr-2"/>Security</h3>
                         <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                         <Button>Change Password</Button>
                    </div>
                </CardContent>
              </Card>
          </TabsContent>

        </Tabs>
      </section>
    </div>
  )
}

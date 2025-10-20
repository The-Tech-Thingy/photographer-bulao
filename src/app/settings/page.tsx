import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Edit, KeySquare, LogOut, Save, User as UserIcon } from "lucide-react"

export default function SettingsPage() {
    const user = {
        name: "Sofia Davis",
        email: "sofia.davis@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://picsum.photos/seed/user-avatar/100/100"
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
             <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-wider">Account Settings</h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl">
                    Manage your profile, notifications, and security settings.
                </p>
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><UserIcon className="mr-2"/>Personal Information</CardTitle>
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
                            <Input id="email" type="email" defaultValue={user.email} disabled />
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

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><Bell className="mr-2"/>Notifications</CardTitle>
                        <CardDescription>Manage how you receive notifications from us.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center"><KeySquare className="mr-2"/>Security</CardTitle>
                        <CardDescription>Change your password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                         <Button>Change Password</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-destructive"><LogOut className="mr-2"/>Logout</CardTitle>
                        <CardDescription>You will be returned to the login screen.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button variant="destructive">Logout from this device</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

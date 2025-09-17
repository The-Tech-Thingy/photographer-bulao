import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { photographers } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SendHorizonal, Smile, Paperclip } from "lucide-react";

export default function ChatPage() {
    const activeChatPartner = photographers[0];
    const profileImage = PlaceHolderImages.find((img) => img.id === activeChatPartner.profileImage);

    return (
        <div className="container mx-auto h-[calc(100vh-8rem)] py-4">
            <div className="h-full border rounded-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <aside className="hidden md:flex flex-col border-r">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold font-headline">Conversations</h2>
                    </div>
                    <ScrollArea className="flex-1">
                        {photographers.map(p => {
                             const pImage = PlaceHolderImages.find((img) => img.id === p.profileImage);
                             return (
                                <div key={p.id} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-accent ${p.id === activeChatPartner.id ? 'bg-accent' : ''}`}>
                                    <Avatar>
                                        {pImage && <AvatarImage src={pImage.imageUrl} alt={p.name} />}
                                        <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{p.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">Sounds great! See you then.</p>
                                    </div>
                                </div>
                             )
                        })}
                    </ScrollArea>
                </aside>

                <main className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full">
                    <div className="p-4 border-b flex items-center gap-4">
                         <Avatar>
                            {profileImage && <AvatarImage src={profileImage.imageUrl} alt={activeChatPartner.name} />}
                            <AvatarFallback>{activeChatPartner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                             <h2 className="text-lg font-semibold">{activeChatPartner.name}</h2>
                             <p className="text-sm text-green-500">Online</p>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            {/* Mock chat messages */}
                             <div className="flex items-end gap-2">
                                <Avatar className="w-8 h-8">
                                    {profileImage && <AvatarImage src={profileImage.imageUrl} />}
                                    <AvatarFallback>{activeChatPartner.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-lg p-3 max-w-xs">
                                    <p>Hi there! Looking forward to our shoot tomorrow.</p>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 justify-end">
                                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                                    <p>Me too! I've been looking at some locations. How does Central Park sound?</p>
                                </div>
                                 <Avatar className="w-8 h-8">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </div>
                             <div className="flex items-end gap-2">
                                <Avatar className="w-8 h-8">
                                    {profileImage && <AvatarImage src={profileImage.imageUrl} />}
                                    <AvatarFallback>{activeChatPartner.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-lg p-3 max-w-xs">
                                    <p>Sounds great! See you then.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t">
                        <div className="relative">
                            <Input placeholder="Type a message..." className="pr-24" />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <Button variant="ghost" size="icon" aria-label="Add emoji">
                                    <Smile className="w-5 h-5"/>
                                </Button>
                                 <Button variant="ghost" size="icon" aria-label="Attach file">
                                    <Paperclip className="w-5 h-5"/>
                                </Button>
                                <Button size="icon" aria-label="Send message">
                                    <SendHorizonal className="w-5 h-5"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

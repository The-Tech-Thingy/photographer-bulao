import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import type { Photographer } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface PhotographerCardProps {
  photographer: Photographer;
}

export function PhotographerCard({ photographer }: PhotographerCardProps) {
  const profileImage = PlaceHolderImages.find((img) => img.id === photographer.profileImage);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20 bg-secondary/30 border-secondary hover:-translate-y-1 duration-300">
       <CardHeader className="p-0">
          <Link href={`/photographers/${photographer.id}`} className="block relative h-48 w-full">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={`Profile of ${photographer.name}`}
                data-ai-hint={profileImage.imageHint}
                fill
                className="object-cover"
              />
            )}
             <Badge variant={photographer.isAvailable ? "default" : "secondary"} className={
              cn("absolute top-2 right-2", photographer.isAvailable ? "bg-green-600 text-white" : "bg-red-600 text-white")
            }>
              {photographer.isAvailable ? `ETA: ${photographer.eta}` : 'Unavailable'}
            </Badge>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <CardTitle className="text-lg font-bold text-white">{photographer.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1 text-sm text-slate-300">
                    <MapPin className="h-4 w-4" />
                    {photographer.location}
                </CardDescription>
            </div>
          </Link>
        </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="font-semibold">{photographer.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({photographer.reviewCount} reviews)</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
            {photographer.specialties.map(spec => (
                <Badge key={spec} variant="secondary">{spec}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/photographers/${photographer.id}`} className="w-full">
          <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

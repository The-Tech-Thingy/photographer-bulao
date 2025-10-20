export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface Photographer {
  id: string;
  name: string;
  location: string;
  eta: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  profileImage: string;
  portfolio: string[];
  reviews: Review[];
  packages: Package[];
  bio: string;
  specialties: string[];
}

export interface Booking {
  id: string;
  photographerName: string;
  photographerId: string;
  date: string;
  time: string;
  package: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  imageId: string;
  content: string;
  comments: Comment[];
}

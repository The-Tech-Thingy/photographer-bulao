import type { Photographer, Booking } from '@/lib/types';

export const photographers: Photographer[] = [
  {
    id: 'jane-doe',
    name: 'Jane Doe',
    location: 'New York, NY',
    eta: '15 mins',
    rating: 4.9,
    reviewCount: 124,
    isAvailable: true,
    profileImage: 'profile-1',
    bio: 'Specializing in capturing timeless moments, Jane brings a creative and personal touch to every wedding and event she photographs. With over 10 years of experience, her passion for storytelling shines through her work.',
    specialties: ['Wedding', 'Events', 'Portraits'],
    portfolio: ['portfolio-1-1', 'portfolio-1-2', 'portfolio-1-3', 'portfolio-1-4', 'portfolio-1-5', 'portfolio-1-6'],
    reviews: [
      { id: 1, author: 'Alice', rating: 5, comment: 'Absolutely stunning photos! Jane was a pleasure to work with.', avatar: 'https://picsum.photos/seed/rev1/40/40' },
      { id: 2, author: 'Bob', rating: 5, comment: 'Professional, creative, and delivered beyond our expectations.', avatar: 'https://picsum.photos/seed/rev2/40/40' },
    ],
    packages: [
      { id: 1, name: 'Basic Portrait', price: 250, description: 'A quick and professional session.', features: ['1-hour session', '10 edited photos', 'Online gallery'] },
      { id: 2, name: 'Standard Event', price: 800, description: 'Perfect for small events.', features: ['4 hours coverage', '100 edited photos', 'Online gallery'] },
      { id: 3, name: 'Premium Wedding', price: 2500, description: 'Full-day coverage for your special day.', features: ['8 hours coverage', '500+ edited photos', 'Photo album', 'Online gallery'] },
    ],
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    location: 'San Francisco, CA',
    eta: '30 mins',
    rating: 4.8,
    reviewCount: 98,
    isAvailable: true,
    profileImage: 'profile-2',
    bio: 'John is a commercial photographer with a keen eye for detail. His work focuses on product, architectural, and food photography, helping brands create compelling visual narratives.',
    specialties: ['Product', 'Architecture', 'Food'],
    portfolio: ['portfolio-2-1', 'portfolio-2-2', 'portfolio-2-3', 'portfolio-2-4'],
    reviews: [
      { id: 1, author: 'Charlie', rating: 5, comment: 'Made our products look amazing. Highly recommend!', avatar: 'https://picsum.photos/seed/rev3/40/40' },
      { id: 2, author: 'David', rating: 4, comment: 'Great architectural shots, very professional.', avatar: 'https://picsum.photos/seed/rev4/40/40' },
    ],
    packages: [
      { id: 1, name: 'Product Shoot', price: 500, description: 'Studio shots for your products.', features: ['Half-day session', '50 edited photos', 'White background'] },
      { id: 2, name: 'Real Estate', price: 750, description: 'High-quality photos for property listings.', features: ['Up to 3000 sq ft', '25-40 photos', 'Drone shots included'] },
    ],
  },
  {
    id: 'alex-ray',
    name: 'Alex Ray',
    location: 'Chicago, IL',
    eta: '45 mins',
    rating: 4.7,
    reviewCount: 75,
    isAvailable: false,
    profileImage: 'profile-3',
    bio: 'An urban explorer and street photographer, Alex captures the raw, candid moments of city life. Also available for fashion and lifestyle shoots that require an edgy, authentic feel.',
    specialties: ['Street', 'Fashion', 'Lifestyle'],
    portfolio: ['portfolio-3-1', 'portfolio-3-2'],
    reviews: [
      { id: 1, author: 'Eve', rating: 5, comment: 'Alex has a unique style that is simply captivating.', avatar: 'https://picsum.photos/seed/rev5/40/40' },
    ],
    packages: [
      { id: 1, name: 'Street Style Session', price: 300, description: 'A candid photoshoot in the city.', features: ['2-hour session', '30 edited photos', '2 locations'] },
      { id: 2, name: 'Fashion Lookbook', price: 1200, description: 'For designers and brands.', features: ['Full-day shoot', 'Multiple looks', 'Studio or location'] },
    ],
  },
  {
    id: 'priya-singh',
    name: 'Priya Singh',
    location: 'Austin, TX',
    eta: '20 mins',
    rating: 5.0,
    reviewCount: 150,
    isAvailable: true,
    profileImage: 'profile-4',
    bio: 'Priya specializes in family, newborn, and maternity photography. Her warm and gentle approach creates a comfortable atmosphere, resulting in natural and heartwarming photos.',
    specialties: ['Family', 'Newborn', 'Maternity'],
    portfolio: ['portfolio-4-1', 'portfolio-4-2', 'portfolio-2-1'],
    reviews: [
      { id: 1, author: 'Frank', rating: 5, comment: 'Priya was amazing with our newborn. The photos are precious!', avatar: 'https://picsum.photos/seed/rev6/40/40' },
      { id: 2, author: 'Grace', rating: 5, comment: 'Our family photos are the best we have ever had.', avatar: 'https://picsum.photos/seed/rev7/40/40' },
    ],
    packages: [
      { id: 1, name: 'Newborn Session', price: 450, description: 'Capture the earliest moments.', features: ['2-3 hour session', 'In-home or studio', '20 edited photos'] },
      { id: 2, name: 'Family Portraits', price: 400, description: 'Create lasting memories.', features: ['1-hour outdoor session', '40 edited photos', 'Online gallery'] },
    ],
  },
];

export const featuredPhotographers = photographers.filter(p => p.rating >= 4.8);
export const availablePhotographers = photographers.filter(p => p.isAvailable);

export const bookings: Booking[] = [
    {
        id: 'booking-1',
        photographerId: 'jane-doe',
        photographerName: 'Jane Doe',
        date: '2024-08-15',
        time: '14:00',
        package: 'Premium Wedding',
        status: 'Upcoming',
    },
    {
        id: 'booking-2',
        photographerId: 'priya-singh',
        photographerName: 'Priya Singh',
        date: '2024-07-20',
        time: '10:00',
        package: 'Family Portraits',
        status: 'Upcoming',
    },
    {
        id: 'booking-3',
        photographerId: 'john-smith',
        photographerName: 'John Smith',
        date: '2024-06-01',
        time: '13:00',
        package: 'Product Shoot',
        status: 'Completed',
        gallery: ['portfolio-2-2', 'portfolio-2-3', 'portfolio-2-4', 'portfolio-3-1', 'portfolio-3-2']
    },
    {
        id: 'booking-4',
        photographerId: 'alex-ray',
        photographerName: 'Alex Ray',
        date: '2024-05-10',
        time: '11:00',
        package: 'Street Style Session',
        status: 'Cancelled',
    },
     {
        id: 'booking-5',
        photographerId: 'jane-doe',
        photographerName: 'Jane Doe',
        date: '2024-04-22',
        time: '16:00',
        package: 'Standard Event',
        status: 'Completed',
        gallery: ['portfolio-1-1', 'portfolio-1-2', 'portfolio-1-3', 'portfolio-1-4', 'portfolio-1-5', 'portfolio-1-6']
    },
];

export const completedBookingsWithGalleries = bookings.filter(
    (b) => b.status === 'Completed' && b.gallery && b.gallery.length > 0
);

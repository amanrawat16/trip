export const listings = [
  {
    id: 1,
    title: "Toyota Camry 2023",
    description: "Reliable sedan perfect for city driving and business trips. Automatic transmission with excellent fuel economy.",
    price: 180,
    location: "Dubai Marina",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Nissan Patrol 2022",
    description: "Popular SUV for desert trips and family outings. 4x4 capability with spacious interior.",
    price: 350,
    location: "Jumeirah Beach",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z"
  },
  {
    id: 3,
    title: "Toyota Land Cruiser 2023",
    description: "Luxury SUV perfect for desert adventures and VIP transport. Premium features and off-road capability.",
    price: 450,
    location: "Palm Jumeirah",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: 4,
    title: "Honda Civic 2023",
    description: "Compact sedan ideal for daily commuting. Fuel efficient with modern technology features.",
    price: 150,
    location: "Downtown Dubai",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400&h=300&fit=crop",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  },
  {
    id: 5,
    title: "Lexus LX 2023",
    description: "Ultra-luxury SUV with premium amenities. Perfect for high-end clients and special occasions.",
    price: 600,
    location: "Burj Al Arab",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z"
  },
  {
    id: 6,
    title: "Toyota Fortuner 2022",
    description: "Popular 7-seater SUV for family trips and group travel. Reliable and spacious.",
    price: 280,
    location: "Dubai Mall",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    createdAt: "2024-01-10T13:20:00Z",
    updatedAt: "2024-01-10T13:20:00Z"
  },
  {
    id: 7,
    title: "Honda Accord 2023",
    description: "Executive sedan with premium features. Perfect for business meetings and airport transfers.",
    price: 220,
    location: "Dubai International Airport",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    createdAt: "2024-01-09T08:45:00Z",
    updatedAt: "2024-01-09T08:45:00Z"
  },
  {
    id: 8,
    title: "Nissan Sunny 2023",
    description: "Economical compact car perfect for budget-conscious travelers. Great for city driving.",
    price: 120,
    location: "Deira",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    createdAt: "2024-01-08T15:10:00Z",
    updatedAt: "2024-01-08T15:10:00Z"
  }
];

export const auditTrail = [
  {
    id: "1",
    action: "approved",
    listingId: 1,
    listingTitle: "Toyota Camry 2023",
    timestamp: "2024-01-15T11:00:00Z",
    admin: "admin@example.com"
  },
  {
    id: "2",
    action: "rejected",
    listingId: 2,
    listingTitle: "Nissan Patrol 2022",
    timestamp: "2024-01-14T15:30:00Z",
    admin: "admin@example.com"
  },
  {
    id: "3",
    action: "edited",
    listingId: 3,
    listingTitle: "Toyota Land Cruiser 2023",
    timestamp: "2024-01-13T10:15:00Z",
    admin: "admin@example.com",
    changes: {
      price: { from: 400, to: 450 },
      description: { from: "Luxury SUV", to: "Luxury SUV perfect for desert adventures and VIP transport. Premium features and off-road capability." }
    }
  }
]; 
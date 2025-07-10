import { listings, auditTrail } from '@/lib/data';

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, title, description, price, location } = req.body;

  const listingIndex = listings.findIndex(listing => listing.id === id);
  
  if (listingIndex === -1) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  const originalListing = { ...listings[listingIndex] };
  
  listings[listingIndex] = {
    ...listings[listingIndex],
    title: title || listings[listingIndex].title,
    description: description || listings[listingIndex].description,
    price: price || listings[listingIndex].price,
    location: location || listings[listingIndex].location,
    updatedAt: new Date().toISOString()
  };

  auditTrail.push({
    id: Date.now().toString(),
    action: 'edited',
    listingId: id,
    listingTitle: listings[listingIndex].title,
    timestamp: new Date().toISOString(),
    admin: 'admin@example.com',
    changes: {
      title: originalListing.title !== listings[listingIndex].title ? { from: originalListing.title, to: listings[listingIndex].title } : null,
      description: originalListing.description !== listings[listingIndex].description ? { from: originalListing.description, to: listings[listingIndex].description } : null,
      price: originalListing.price !== listings[listingIndex].price ? { from: originalListing.price, to: listings[listingIndex].price } : null,
      location: originalListing.location !== listings[listingIndex].location ? { from: originalListing.location, to: listings[listingIndex].location } : null
    }
  });

  res.status(200).json({ success: true });
} 
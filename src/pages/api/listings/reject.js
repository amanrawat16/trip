import { listings, auditTrail } from '@/lib/data';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;

  const listingIndex = listings.findIndex(listing => listing.id === id);
  
  if (listingIndex === -1) {
    return res.status(404).json({ error: 'Listing not found' });
  }

  listings[listingIndex].status = 'rejected';

  auditTrail.push({
    id: Date.now().toString(),
    action: 'rejected',
    listingId: id,
    listingTitle: listings[listingIndex].title,
    timestamp: new Date().toISOString(),
    admin: 'admin@example.com'
  });

  res.status(200).json({ success: true });
} 
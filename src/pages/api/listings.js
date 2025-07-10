import { listings } from '@/lib/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { page = 1, limit = 5, status = 'all' } = req.query;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  let filteredListings = listings;

  if (status !== 'all') {
    filteredListings = listings.filter(listing => listing.status === status);
  }

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedListings = filteredListings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredListings.length / limitNum);

  res.status(200).json({
    success: true,
    listings: paginatedListings,
    totalPages,
    currentPage: pageNum,
    totalItems: filteredListings.length
  });
} 
import { auditTrail } from '@/lib/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const sortedTrail = [...auditTrail].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedTrail = sortedTrail.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedTrail.length / limitNum);

  res.status(200).json({
    success: true,
    auditTrail: paginatedTrail,
    totalPages,
    currentPage: pageNum,
    totalItems: sortedTrail.length
  });
} 
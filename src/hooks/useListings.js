import { useState, useEffect, useCallback } from 'react';

export default function useListings(initialPage = 1, initialStatus = 'all') {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [cache, setCache] = useState(new Map());

  const fetchListings = useCallback(async (page, status) => {
    const cacheKey = `${page}-${status}`;
    
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      setListings(cached.listings);
      setTotalPages(cached.totalPages);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/listings?page=${page}&limit=5&status=${status}`);
      const data = await response.json();
      
      if (data.success) {
        setListings(data.listings);
        setTotalPages(data.totalPages);
        
        cache.set(cacheKey, {
          listings: data.listings,
          totalPages: data.totalPages
        });
        setCache(new Map(cache));
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  }, [cache]);

  const refetch = useCallback(() => {
    const currentPage = Math.ceil(listings.length / 5) || 1;
    fetchListings(currentPage, initialStatus);
  }, [fetchListings, listings.length, initialStatus]);

  useEffect(() => {
    fetchListings(initialPage, initialStatus);
  }, [fetchListings, initialPage, initialStatus]);

  return {
    listings,
    totalPages,
    loading,
    refetch
  };
} 
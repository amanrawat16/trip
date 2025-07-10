import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ListingTable from '@/components/dashboard/ListingTable';
import StatusFilter from '@/components/dashboard/StatusFilter';
import Pagination from '@/components/dashboard/Pagination';
import Modal from '@/components/ui/Modal';
import EditForm from '@/components/forms/EditForm';
import useListings from '@/hooks/useListings';

export default function Dashboard({ initialListings, totalPages }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [localListings, setLocalListings] = useState(initialListings);
  const { user, logout } = useAuth();
  const router = useRouter();

  const { listings, totalPages: fetchedTotalPages, loading: listingsLoading, refetch } = useListings(currentPage, statusFilter);

  useEffect(() => {
    if (listings && listings.length > 0) {
      setLocalListings(listings);
    }
  }, [listings]);

  const handleApprove = useCallback(async (id) => {
    setLoadingId(id);
    
    setLocalListings(prev => 
      prev.map(listing => 
        listing.id === id 
          ? { ...listing, status: 'approved' }
          : listing
      )
    );

    try {
      const response = await fetch('/api/listings/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        refetch();
      } else {
        setLocalListings(prev => 
          prev.map(listing => 
            listing.id === id 
              ? { ...listing, status: 'pending' }
              : listing
          )
        );
      }
    } catch (error) {
      console.error('Error approving listing:', error);
      setLocalListings(prev => 
        prev.map(listing => 
          listing.id === id 
            ? { ...listing, status: 'pending' }
            : listing
        )
      );
    } finally {
      setLoadingId(null);
    }
  }, [refetch]);

  const handleReject = useCallback(async (id) => {
    setLoadingId(id);
    
    setLocalListings(prev => 
      prev.map(listing => 
        listing.id === id 
          ? { ...listing, status: 'rejected' }
          : listing
      )
    );

    try {
      const response = await fetch('/api/listings/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        refetch();
      } else {
        setLocalListings(prev => 
          prev.map(listing => 
            listing.id === id 
              ? { ...listing, status: 'pending' }
              : listing
          )
        );
      }
    } catch (error) {
      console.error('Error rejecting listing:', error);
      setLocalListings(prev => 
        prev.map(listing => 
          listing.id === id 
            ? { ...listing, status: 'pending' }
            : listing
        )
      );
    } finally {
      setLoadingId(null);
    }
  }, [refetch]);

  const handleEdit = useCallback((listing) => {
    setEditingListing(listing);
    setShowEditModal(true);
  }, []);

  const handleSaveEdit = useCallback(async (updatedData) => {
    setLoadingId(editingListing.id);
    
    setLocalListings(prev => 
      prev.map(listing => 
        listing.id === editingListing.id 
          ? { ...listing, ...updatedData }
          : listing
      )
    );

    try {
      const response = await fetch('/api/listings/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingListing.id, ...updatedData })
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingListing(null);
        refetch();
      } else {
        setLocalListings(prev => 
          prev.map(listing => 
            listing.id === editingListing.id 
              ? { ...listing, ...editingListing }
              : listing
          )
        );
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      setLocalListings(prev => 
        prev.map(listing => 
          listing.id === editingListing.id 
            ? { ...listing, ...editingListing }
            : listing
        )
      );
    } finally {
      setLoadingId(null);
    }
  }, [editingListing, refetch]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const displayListings = useMemo(() => {
    return localListings.length > 0 ? localListings : (listings || []);
  }, [localListings, listings]);

  const displayTotalPages = fetchedTotalPages || totalPages;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Car Rental Admin Dashboard</h1>
                {user && (
                  <p className="text-sm text-gray-600 mt-1">Welcome, {user.email}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/audit')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Audit Trail
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Car Rental Listings</h2>
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            </div>

            {listingsLoading ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-6 py-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <ListingTable
                  listings={displayListings}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEdit={handleEdit}
                  loadingId={loadingId}
                />

                {displayListings.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No listings found.</p>
                  </div>
                )}

                {displayTotalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={displayTotalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {showEditModal && editingListing && (
          <Modal onClose={() => setShowEditModal(false)}>
            <EditForm
              listing={editingListing}
              onSubmit={handleSaveEdit}
              onCancel={() => setShowEditModal(false)}
              loading={loadingId === editingListing.id}
            />
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
}

export async function getServerSideProps({ req }) {
  const { getServerSession } = await import('@/lib/auth');
  
  if (!getServerSession(req)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { listings } = await import('@/lib/data');
  
  const filteredListings = listings.filter(listing => listing.status === 'pending');
  const totalPages = Math.ceil(filteredListings.length / 5);

  return {
    props: {
      initialListings: filteredListings.slice(0, 5),
      totalPages,
    },
  };
} 
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Pagination from '@/components/dashboard/Pagination';
import { useRouter } from 'next/router';

export default function Audit({ initialAuditTrail, totalPages }) {
  const [auditTrail, setAuditTrail] = useState(initialAuditTrail);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchedTotalPages, setFetchedTotalPages] = useState(totalPages);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchAuditTrail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/audit?page=${currentPage}&limit=10`);
        const data = await response.json();
        
        if (data.success) {
          setAuditTrail(data.auditTrail);
          setFetchedTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching audit trail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditTrail();
  }, [currentPage]);

  const handleLogout = async () => {
    await logout();
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'edited': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const displayTotalPages = fetchedTotalPages || totalPages;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
                {user && (
                  <p className="text-sm text-gray-600 mt-1">Welcome, {user.email}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Back to Dashboard
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Audit Trail</h2>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {auditTrail.map((entry) => (
                    <div key={entry.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(entry.action)}`}>
                            {entry.action}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(entry.timestamp)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          by {entry.admin}
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900">
                          {entry.listingTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Listing ID: {entry.listingId}
                        </p>
                        
                        {entry.action === 'edited' && entry.changes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Changes:</h4>
                            <div className="space-y-1">
                              {Object.entries(entry.changes).map(([field, change]) => {
                                if (!change) return null;
                                return (
                                  <div key={field} className="text-sm">
                                    <span className="font-medium text-gray-900">{field}:</span>
                                    <span className="text-gray-700 ml-1">
                                      "{change.from}" → "{change.to}"
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {auditTrail.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No audit entries found.</p>
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

  const { auditTrail } = await import('@/lib/data');
  
  const sortedTrail = [...auditTrail].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const totalPages = Math.ceil(sortedTrail.length / 10);

  return {
    props: {
      initialAuditTrail: sortedTrail.slice(0, 10),
      totalPages,
    },
  };
} 
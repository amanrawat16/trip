import { memo } from 'react';

const ListingRow = memo(function ListingRow({ listing, onApprove, onReject, onEdit, loadingId = null }) {
  // Check if this specific row is loading
  const isRowLoading = loadingId === listing.id;
  
  const handleApprove = () => onApprove(listing.id);
  const handleReject = () => onReject(listing.id);
  const handleEdit = () => onEdit(listing);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-24 object-cover rounded"
              src={listing.imageUrl}
              alt={listing.title}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {listing.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {listing.description}
            </p>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
              <span className="font-medium text-green-600">AED {listing.price}/day</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.location}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          listing.status === 'approved' ? 'bg-green-100 text-green-800' :
          listing.status === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {listing.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {listing.status === 'pending' && (
            <>
              <button
                onClick={handleApprove}
                disabled={isRowLoading}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isRowLoading ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={handleReject}
                disabled={isRowLoading}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isRowLoading ? 'Processing...' : 'Reject'}
              </button>
            </>
          )}
          <button
            onClick={handleEdit}
            disabled={isRowLoading}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
});

const ListingTable = memo(function ListingTable({ listings, onApprove, onReject, onEdit, loadingId = null }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Listing Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listings.map((listing) => (
            <ListingRow
              key={listing.id}
              listing={listing}
              onApprove={onApprove}
              onReject={onReject}
              onEdit={onEdit}
              loadingId={loadingId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ListingTable; 
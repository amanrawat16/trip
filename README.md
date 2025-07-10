# Car Rental Admin Dashboard

I built this car rental admin dashboard using Next.js with Pages Router. It's a full-stack app for managing car rental listings with authentication, approval workflows, and audit trails.

## Features Built

### Core Features
- **Login system** with demo credentials (admin@example.com / password123)
- **Dashboard** with paginated car rental listings
- **Approve/Reject** buttons for pending listings
- **Edit functionality** with modal form
- **Status filtering** (all/pending/approved/rejected)
- **Audit trail** with action logging and timestamps
- **Pagination** for listings and audit entries

### Technical Implementation
- **Next.js 15 with Pages Router** - Used Pages Router for better SSR control with getServerSideProps
- **React Context API** - For auth state management
- **TailwindCSS** - For modern, responsive styling
- **Server-side rendering** - getServerSideProps for initial data loading
- **Protected routes** - Auth-based route protection
- **API routes** - RESTful endpoints for all CRUD operations

## How to Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```

3. **Open the app**
   - Go to `http://localhost:3000`
   - Login with: admin@example.com / password123

## Extra Features Added

- **Row-level loading states** - Only the specific row being updated shows loading
- **Row-based rendering** - Only affected rows re-render, not entire table
- **Optimistic UI updates** - Immediate feedback for better UX
- **Custom useListings hook** - With caching to prevent duplicate API calls
- **React.memo & useCallback** - Performance optimizations
- **Error handling** throughout the application
- **Responsive design** for mobile and desktop
- **Dubai-specific car rental data**

## Requirements Met

### Core Requirements ✅
- [x] Next.js with Pages Router
- [x] Login authentication
- [x] Dashboard with paginated listings
- [x] Approve, reject, edit actions
- [x] API routes for all operations
- [x] SSR with getServerSideProps
- [x] Protected routes
- [x] React Context API
- [x] TailwindCSS styling

### Stretch Goals ✅
- [x] Status filtering
- [x] Audit trail
- [x] Performance optimizations

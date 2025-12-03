import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can be added here
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated
        if (!token) {
          return false;
        }

        // Check if user is active (if needed)
        // Additional role-based checks can be added here
        
        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

// Protect all admin routes except login
export const config = {
  matcher: [
    '/admin/((?!login).*)',
  ],
};

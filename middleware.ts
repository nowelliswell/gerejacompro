import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // If no token, withAuth will handle redirect
    if (!token) {
      return NextResponse.next();
    }

    // Additional middleware logic can be added here
    // For example: logging, analytics, role-based routing, etc.
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated
        if (!token) {
          return false;
        }

        // Verify token has required fields
        if (!token.id || !token.role) {
          return false;
        }

        // Token is valid and user is authenticated
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

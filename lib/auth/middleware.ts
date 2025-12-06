import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

/**
 * Middleware to check if user is authenticated
 * Redirects to login page if not authenticated
 */
export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if user is authenticated
  if (!token) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token has required fields
  if (!token.id || !token.role) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Higher-order function to require specific roles for API routes
 * Returns 401 if not authenticated, 403 if insufficient permissions
 */
export function requireRole(allowedRoles: string[]) {
  return async (req: NextRequest) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json(
        { 
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
            timestamp: new Date().toISOString()
          }
        },
        { status: 401 }
      );
    }

    const userRole = token.role as string;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { 
          error: {
            code: 'FORBIDDEN',
            message: 'Insufficient permissions',
            timestamp: new Date().toISOString()
          }
        },
        { status: 403 }
      );
    }

    return NextResponse.next();
  };
}

/**
 * Utility function to get authenticated user from API route
 * Returns null if not authenticated
 */
export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return null;
  }

  return {
    id: (session.user as any).id,
    name: session.user.name,
    email: session.user.email,
    username: (session.user as any).username,
    role: (session.user as any).role,
    avatar: (session.user as any).avatar,
  };
}

/**
 * Utility function to check if user has required role
 */
export async function hasRole(allowedRoles: string[]): Promise<boolean> {
  const user = await getAuthenticatedUser();
  
  if (!user) {
    return false;
  }

  return allowedRoles.includes(user.role);
}

# Authentication System

This directory contains the authentication and authorization logic for the admin dashboard.

## Files

- **auth.ts**: NextAuth configuration with JWT strategy and credentials provider
- **session.ts**: Server-side session utilities for getting current user and checking roles
- **middleware.ts**: Middleware functions for protecting routes and checking permissions
- **seed-admin.ts**: Utility to seed default admin user

## Setup

1. Make sure environment variables are set in `.env.local`:
   ```
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

2. Run the seed script to create default admin user:
   ```bash
   npm run seed:admin
   ```

3. Default credentials:
   - Username: `admin`
   - Password: `admin123`

## Usage

### Protecting Pages (Server Components)

```typescript
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }
  
  return <div>Protected content</div>;
}
```

### Protecting API Routes

```typescript
import { requireAuth, checkRole } from '@/lib/auth/session';

export async function GET() {
  try {
    // Require authentication
    const user = await requireAuth();
    
    // Or check specific role
    await checkRole(['super_admin', 'admin']);
    
    // Your logic here
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
```

### Client-Side Authentication

```typescript
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <button onClick={() => signIn()}>Sign In</button>;
  }
  
  return (
    <div>
      <p>Welcome {session.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT-based sessions with 30-minute expiration
- HTTP-only cookies for token storage
- Automatic session cleanup on logout
- Inactive user prevention
- Role-based access control

## User Roles

- **super_admin**: Full access to all features
- **admin**: Standard admin access
- **editor**: Limited access for content management

## Session Management

Sessions automatically expire after 30 minutes of inactivity. Users will be redirected to the login page when their session expires.

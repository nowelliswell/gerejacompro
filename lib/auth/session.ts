import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  
  return session.user;
}

export async function checkRole(allowedRoles: string[]) {
  const user = await requireAuth();
  const userRole = (user as any).role;
  
  if (!allowedRoles.includes(userRole)) {
    throw new Error('Forbidden');
  }
  
  return user;
}

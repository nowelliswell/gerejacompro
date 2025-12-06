import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { getAuthenticatedUser, hasRole } from '../middleware';
import { getServerSession } from 'next-auth';

// Mock next-auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

describe('Auth Middleware Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAuthenticatedUser', () => {
    it('should return user data when session exists', async () => {
      const mockSession = {
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          username: 'admin',
          role: 'admin',
          avatar: '/avatar.jpg',
        },
      };

      vi.mocked(getServerSession).mockResolvedValue(mockSession as any);

      const user = await getAuthenticatedUser();

      expect(user).toEqual({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        username: 'admin',
        role: 'admin',
        avatar: '/avatar.jpg',
      });
    });

    it('should return null when session does not exist', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null);

      const user = await getAuthenticatedUser();

      expect(user).toBeNull();
    });

    it('should return null when session has no user', async () => {
      vi.mocked(getServerSession).mockResolvedValue({ user: null } as any);

      const user = await getAuthenticatedUser();

      expect(user).toBeNull();
    });
  });

  describe('hasRole', () => {
    it('should return true when user has allowed role', async () => {
      const mockSession = {
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
        },
      };

      vi.mocked(getServerSession).mockResolvedValue(mockSession as any);

      const result = await hasRole(['admin', 'super_admin']);

      expect(result).toBe(true);
    });

    it('should return false when user does not have allowed role', async () => {
      const mockSession = {
        user: {
          id: '1',
          name: 'Editor User',
          email: 'editor@example.com',
          role: 'editor',
        },
      };

      vi.mocked(getServerSession).mockResolvedValue(mockSession as any);

      const result = await hasRole(['admin', 'super_admin']);

      expect(result).toBe(false);
    });

    it('should return false when user is not authenticated', async () => {
      vi.mocked(getServerSession).mockResolvedValue(null);

      const result = await hasRole(['admin']);

      expect(result).toBe(false);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { loginSchema } from '@/lib/utils/validation';

describe('Login Validation', () => {
  describe('loginSchema', () => {
    it('should accept valid credentials', () => {
      const validData = {
        username: 'admin',
        password: 'password123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject username shorter than 3 characters', () => {
      const invalidData = {
        username: 'ab',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Username minimal 3 karakter');
      }
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        username: 'admin',
        password: '12345',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password minimal 6 karakter');
      }
    });

    it('should reject empty username', () => {
      const invalidData = {
        username: '',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const invalidData = {
        username: 'admin',
        password: '',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept email as username', () => {
      const validData = {
        username: 'admin@gereja.com',
        password: 'password123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept long passwords', () => {
      const validData = {
        username: 'admin',
        password: 'verylongpassword123456789',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});

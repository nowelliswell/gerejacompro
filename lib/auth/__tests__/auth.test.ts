import { describe, it, expect, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { readData, writeData } from '@/lib/utils/db';
import { User } from '@/lib/types/user';

describe('Authentication System', () => {
  describe('Password Hashing', () => {
    it('should hash passwords with bcrypt', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword).toMatch(/^\$2[aby]\$/);
    });

    it('should verify correct passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const isValid = await bcrypt.compare(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const isValid = await bcrypt.compare('wrongPassword', hashedPassword);
      expect(isValid).toBe(false);
    });
  });

  describe('User Data Structure', () => {
    it('should have required user fields', async () => {
      const data = await readData<{ users: User[] }>('users.json');
      const users = data.users || [];
      
      if (users.length > 0) {
        const user = users[0];
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('nama');
        expect(user).toHaveProperty('isActive');
        expect(user).toHaveProperty('createdAt');
        expect(user).toHaveProperty('updatedAt');
      }
    });

    it('should have valid role values', async () => {
      const data = await readData<{ users: User[] }>('users.json');
      const users = data.users || [];
      
      const validRoles = ['super_admin', 'admin', 'editor'];
      
      users.forEach(user => {
        expect(validRoles).toContain(user.role);
      });
    });

    it('should have hashed passwords', async () => {
      const data = await readData<{ users: User[] }>('users.json');
      const users = data.users || [];
      
      users.forEach(user => {
        // Bcrypt hashes start with $2a$, $2b$, or $2y$
        expect(user.password).toMatch(/^\$2[aby]\$/);
      });
    });
  });

  describe('User Authentication Logic', () => {
    it('should find user by username', async () => {
      const data = await readData<{ users: User[] }>('users.json');
      const users = data.users || [];
      
      const testUsername = 'admin';
      const user = users.find(u => u.username === testUsername);
      
      if (users.length > 0) {
        expect(user).toBeDefined();
      }
    });

    it('should find user by email', async () => {
      const data = await readData<{ users: User[] }>('users.json');
      const users = data.users || [];
      
      if (users.length > 0) {
        const testEmail = users[0].email;
        const user = users.find(u => u.email === testEmail);
        expect(user).toBeDefined();
      }
    });

    it('should check if user is active', async () => {
      const data = await readData<{ users: User[] }>('users.json');
      const users = data.users || [];
      
      users.forEach(user => {
        expect(typeof user.isActive).toBe('boolean');
      });
    });
  });
});

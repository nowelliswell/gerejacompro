import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { readData, writeData } from '@/lib/utils/db';
import { User } from '@/lib/types/user';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username dan password harus diisi');
        }

        // Read users from database
        const data = await readData<{ users: User[] }>('users.json');
        const users = data.users || [];

        // Find user by username or email
        const user = users.find(
          (u) =>
            u.username === credentials.username ||
            u.email === credentials.username
        );

        if (!user) {
          throw new Error('Username atau password salah');
        }

        // Check if user is active
        if (!user.isActive) {
          throw new Error('Akun tidak aktif. Hubungi administrator');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Username atau password salah');
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        await writeData('users.json', data);

        // Return user data (excluding password)
        return {
          id: user.id,
          name: user.nama,
          email: user.email,
          username: user.username,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.role = (user as any).role;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
        (session.user as any).role = token.role;
        (session.user as any).avatar = token.avatar;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};

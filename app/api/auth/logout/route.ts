import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

/**
 * POST /api/auth/logout
 * Handles admin logout and session cleanup
 * 
 * Requirements: 1.4 - WHEN admin logout THEN sistem SHALL menghapus session dan mengarahkan ke halaman login
 */
export async function POST() {
  try {
    // Get current session to verify user is logged in
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Tidak ada session aktif' },
        { status: 401 }
      );
    }

    // NextAuth handles session cleanup automatically through signOut on client
    // This endpoint confirms the logout and can perform additional cleanup if needed
    // For example: logging the logout event, clearing additional server-side data, etc.
    
    // Log the logout event (optional - for audit trail)
    console.log(`User ${session.user?.email} logged out at ${new Date().toISOString()}`);
    
    // Return success response
    // The client will handle the actual signOut call and redirect
    return NextResponse.json(
      { 
        message: 'Logout berhasil',
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat logout',
        success: false 
      },
      { status: 500 }
    );
  }
}

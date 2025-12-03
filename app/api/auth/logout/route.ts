import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // NextAuth handles session cleanup automatically through signOut
    // This endpoint is for additional cleanup if needed
    
    return NextResponse.json(
      { message: 'Logout berhasil' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}

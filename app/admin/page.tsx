import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <div className="border-t pt-4">
            <p className="text-gray-600 mb-2">
              Selamat datang, <span className="font-semibold">{session.user?.name}</span>!
            </p>
            <p className="text-sm text-gray-500">
              Email: {session.user?.email}
            </p>
            <p className="text-sm text-gray-500">
              Role: {(session.user as any)?.role}
            </p>
          </div>
          
          <div className="mt-6">
            <a
              href="/api/auth/signout"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

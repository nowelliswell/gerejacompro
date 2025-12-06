import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import DashboardClient from '@/app/admin/DashboardClient'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return <DashboardClient userName={session.user?.name || 'Admin'} />
}

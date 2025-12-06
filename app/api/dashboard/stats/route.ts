import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { readData } from '@/lib/utils/db'
import type { Jemaat, Donasi, PermohonanPelayanan, Pendaftar } from '@/lib/types'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    // Read all data files
    const jemaatData = await readData<{ jemaat: Jemaat[] }>('jemaat.json')
    const donasiData = await readData<{ donasi: Donasi[] }>('donasi.json')
    const pelayananData = await readData<{ pelayanan: PermohonanPelayanan[] }>('pelayanan.json')
    const pendaftarData = await readData<{ pendaftar: Pendaftar[] }>('pendaftar.json')

    // Calculate total jemaat (active only)
    const totalJemaat = jemaatData.jemaat.filter(j => j.status === 'active').length

    // Calculate total donasi bulan ini (verified only)
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    const totalDonasiThisMonth = donasiData.donasi
      .filter(d => {
        if (d.status !== 'verified') return false
        const donationDate = new Date(d.createdAt)
        return donationDate.getMonth() === currentMonth && 
               donationDate.getFullYear() === currentYear
      })
      .reduce((sum, d) => sum + d.jumlah, 0)

    // Calculate pending service requests
    const pendingServiceRequests = pelayananData.pelayanan
      .filter(p => p.status === 'pending').length

    // Calculate registrations in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentRegistrations = pendaftarData.pendaftar
      .filter(p => new Date(p.createdAt) >= thirtyDaysAgo).length

    return NextResponse.json({
      totalJemaat,
      totalDonasiThisMonth,
      pendingServiceRequests,
      recentRegistrations
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Failed to fetch dashboard statistics',
          timestamp: new Date().toISOString()
        } 
      },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { readData } from '@/lib/utils/db'
import type { Donasi, PermohonanPelayanan, Pendaftar } from '@/lib/types'

interface Activity {
  id: string
  type: 'registration' | 'donation' | 'service_request'
  title: string
  description: string
  timestamp: string
  link: string
}

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
    const donasiData = await readData<{ donasi: Donasi[] }>('donasi.json')
    const pelayananData = await readData<{ pelayanan: PermohonanPelayanan[] }>('pelayanan.json')
    const pendaftarData = await readData<{ pendaftar: Pendaftar[] }>('pendaftar.json')

    const activities: Activity[] = []

    // Add registrations
    pendaftarData.pendaftar.forEach(p => {
      activities.push({
        id: `registration-${p.id}`,
        type: 'registration',
        title: 'Pendaftaran Jemaat Baru',
        description: `${p.nama} mendaftar sebagai jemaat baru`,
        timestamp: p.createdAt,
        link: `/admin/pendaftar/${p.id}`
      })
    })

    // Add donations
    donasiData.donasi.forEach(d => {
      activities.push({
        id: `donation-${d.id}`,
        type: 'donation',
        title: 'Donasi Baru',
        description: `${d.nama} mengirim donasi ${d.kategori}`,
        timestamp: d.createdAt,
        link: `/admin/donasi/${d.id}`
      })
    })

    // Add service requests
    pelayananData.pelayanan.forEach(p => {
      activities.push({
        id: `service-${p.id}`,
        type: 'service_request',
        title: 'Permohonan Pelayanan',
        description: `${p.nama} mengajukan permohonan ${p.jenis}`,
        timestamp: p.createdAt,
        link: `/admin/pelayanan/${p.id}`
      })
    })

    // Sort by timestamp descending (newest first) and take top 10
    activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json({ activities: activities.slice(0, 10) })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Failed to fetch activities',
          timestamp: new Date().toISOString()
        } 
      },
      { status: 500 }
    )
  }
}

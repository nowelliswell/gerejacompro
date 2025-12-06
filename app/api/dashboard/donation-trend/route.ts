import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { readData } from '@/lib/utils/db'
import type { Donasi } from '@/lib/types'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    // Read donation data
    const donasiData = await readData<{ donasi: Donasi[] }>('donasi.json')
    const donations = donasiData.donasi || []
    console.log('=== DONATION TREND API ===')
    console.log('Total donations in database:', donations.length)
    console.log('Donations:', JSON.stringify(donations, null, 2))

    // Generate last 6 months data
    const now = new Date()
    const trendData = []

    // Month names in Indonesian
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des']

    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const targetYear = targetDate.getFullYear()
      const targetMonth = targetDate.getMonth()
      
      // Calculate total for this month (verified donations only)
      const monthDonations = donations.filter(d => {
        if (d.status !== 'verified') return false
        const donationDate = new Date(d.createdAt)
        return donationDate.getFullYear() === targetYear && 
               donationDate.getMonth() === targetMonth
      })
      
      const monthTotal = monthDonations.reduce((sum, d) => sum + (d.jumlah || 0), 0)

      const monthLabel = `${monthNames[targetMonth]} ${targetYear}`
      console.log(`Month: ${monthLabel}, Donations: ${monthDonations.length}, Total: ${monthTotal}`)

      trendData.push({
        month: monthLabel,
        total: monthTotal
      })
    }

    console.log('Final trend data being sent:', JSON.stringify(trendData, null, 2))
    console.log('=== END DONATION TREND API ===')
    return NextResponse.json({ data: trendData })
  } catch (error) {
    console.error('Error fetching donation trend:', error)
    return NextResponse.json(
      { 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Failed to fetch donation trend',
          details: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        } 
      },
      { status: 500 }
    )
  }
}

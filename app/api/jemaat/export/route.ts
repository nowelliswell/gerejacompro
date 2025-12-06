import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { readData } from '@/lib/utils/db'
import { Jemaat } from '@/lib/types/jemaat'

// GET /api/jemaat/export - Export jemaat to CSV
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const data = await readData<{ jemaat: Jemaat[] }>('jemaat')
    const jemaatList = data.jemaat || []

    // Generate CSV content
    const headers = [
      'ID',
      'Nama',
      'Email',
      'Telepon',
      'Alamat',
      'Tanggal Lahir',
      'Jenis Kelamin',
      'Status Pernikahan',
      'Tanggal Bergabung',
      'Status',
      'Dibuat Pada',
      'Diperbarui Pada',
    ]

    const csvRows = [headers.join(',')]

    jemaatList.forEach((jemaat) => {
      const row = [
        jemaat.id,
        `"${jemaat.nama.replace(/"/g, '""')}"`,
        jemaat.email,
        jemaat.telepon,
        `"${jemaat.alamat.replace(/"/g, '""')}"`,
        jemaat.tanggalLahir,
        jemaat.jenisKelamin,
        jemaat.statusPernikahan,
        jemaat.tanggalBergabung,
        jemaat.status,
        jemaat.createdAt,
        jemaat.updatedAt,
      ]
      csvRows.push(row.join(','))
    })

    const csvContent = csvRows.join('\n')

    // Return CSV file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="jemaat-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting jemaat:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to export jemaat data',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    )
  }
}

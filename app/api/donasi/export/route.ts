import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import fs from 'fs/promises'
import path from 'path'
import { Donasi } from '@/lib/types/donasi'
import { formatCurrency } from '@/lib/utils/format'
import * as XLSX from 'xlsx'

const DATA_FILE = path.join(process.cwd(), 'data/donasi.json')

async function readDonasi(): Promise<Donasi[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const json = JSON.parse(data)
    return json.donasi || []
  } catch (error) {
    return []
  }
}

// GET /api/donasi/export - Export donations to CSV or Excel
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const kategori = searchParams.get('kategori')
    const status = searchParams.get('status')
    const format = searchParams.get('format') || 'csv' // csv or excel

    let donasi = await readDonasi()

    // Apply filters
    if (startDate) {
      donasi = donasi.filter(d => new Date(d.createdAt) >= new Date(startDate))
    }

    if (endDate) {
      donasi = donasi.filter(d => new Date(d.createdAt) <= new Date(endDate))
    }

    if (kategori) {
      donasi = donasi.filter(d => d.kategori === kategori)
    }

    if (status) {
      donasi = donasi.filter(d => d.status === status)
    }

    // Sort by date
    donasi.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    // Prepare data
    const headers = [
      'ID',
      'Nama',
      'Email',
      'Kategori',
      'Jumlah',
      'Metode',
      'Status',
      'Tanggal',
      'Verified At',
      'Verified By',
      'Catatan'
    ]

    const rows = donasi.map(d => [
      d.id,
      d.nama,
      d.email,
      d.kategori,
      d.jumlah,
      d.metode,
      d.status,
      new Date(d.createdAt).toLocaleString('id-ID'),
      d.verifiedAt ? new Date(d.verifiedAt).toLocaleString('id-ID') : '',
      d.verifiedBy || '',
      d.catatan || ''
    ])

    const dateStr = new Date().toISOString().split('T')[0]

    if (format === 'excel') {
      // Generate Excel file
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Donasi')

      // Generate buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="donasi-export-${dateStr}.xlsx"`
        }
      })
    } else {
      // Generate CSV
      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="donasi-export-${dateStr}.csv"`
        }
      })
    }
  } catch (error) {
    console.error('Error exporting donasi:', error)
    return NextResponse.json(
      { error: 'Failed to export donasi' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import fs from 'fs/promises'
import path from 'path'
import { Donasi } from '@/lib/types/donasi'

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

async function writeDonasi(donasi: Donasi[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify({ donasi }, null, 2), 'utf-8')
}

// GET /api/donasi - Get all donations with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const kategori = searchParams.get('kategori')
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const search = searchParams.get('search')

    let donasi = await readDonasi()

    // Apply filters
    if (kategori) {
      donasi = donasi.filter(d => d.kategori === kategori)
    }

    if (status) {
      donasi = donasi.filter(d => d.status === status)
    }

    if (startDate) {
      donasi = donasi.filter(d => new Date(d.createdAt) >= new Date(startDate))
    }

    if (endDate) {
      donasi = donasi.filter(d => new Date(d.createdAt) <= new Date(endDate))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      donasi = donasi.filter(d => 
        d.nama.toLowerCase().includes(searchLower) ||
        d.email.toLowerCase().includes(searchLower)
      )
    }

    // Sort by createdAt descending (newest first)
    donasi.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ donasi })
  } catch (error) {
    console.error('Error fetching donasi:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donasi' },
      { status: 500 }
    )
  }
}

// POST /api/donasi - Create new donation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const donasi = await readDonasi()

    const newDonasi: Donasi = {
      id: String(Date.now()),
      nama: body.nama,
      email: body.email,
      kategori: body.kategori,
      jumlah: body.jumlah,
      metode: body.metode,
      buktiTransfer: body.buktiTransfer,
      status: 'pending',
      catatan: body.catatan,
      createdAt: new Date().toISOString(),
    }

    donasi.push(newDonasi)
    await writeDonasi(donasi)

    return NextResponse.json({ donasi: newDonasi }, { status: 201 })
  } catch (error) {
    console.error('Error creating donasi:', error)
    return NextResponse.json(
      { error: 'Failed to create donasi' },
      { status: 500 }
    )
  }
}

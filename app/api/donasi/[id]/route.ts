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

// GET /api/donasi/[id] - Get single donation by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const donasi = await readDonasi()
    const item = donasi.find(d => d.id === params.id)

    if (!item) {
      return NextResponse.json({ error: 'Donasi not found' }, { status: 404 })
    }

    return NextResponse.json({ donasi: item })
  } catch (error) {
    console.error('Error fetching donasi:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donasi' },
      { status: 500 }
    )
  }
}

// PUT /api/donasi/[id] - Update donation (verify/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const donasi = await readDonasi()
    const index = donasi.findIndex(d => d.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Donasi not found' }, { status: 404 })
    }

    // Handle verification
    if (body.action === 'verify') {
      donasi[index] = {
        ...donasi[index],
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        verifiedBy: session.user?.email || 'admin',
      }
    } 
    // Handle rejection
    else if (body.action === 'reject') {
      donasi[index] = {
        ...donasi[index],
        status: 'rejected',
        catatan: body.catatan || 'Rejected by admin',
        verifiedAt: new Date().toISOString(),
        verifiedBy: session.user?.email || 'admin',
      }
    }
    // Handle general update
    else {
      donasi[index] = {
        ...donasi[index],
        ...body,
        id: params.id, // Preserve ID
        createdAt: donasi[index].createdAt, // Preserve creation date
      }
    }

    await writeDonasi(donasi)

    return NextResponse.json({ donasi: donasi[index] })
  } catch (error) {
    console.error('Error updating donasi:', error)
    return NextResponse.json(
      { error: 'Failed to update donasi' },
      { status: 500 }
    )
  }
}

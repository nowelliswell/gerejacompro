import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import fs from 'fs/promises'
import path from 'path'
import { PermohonanPelayanan } from '@/lib/types/pelayanan'

const DATA_FILE = path.join(process.cwd(), 'data/pelayanan.json')

async function readPelayanan(): Promise<PermohonanPelayanan[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const json = JSON.parse(data)
    return json.pelayanan || []
  } catch (error) {
    return []
  }
}

async function writePelayanan(pelayanan: PermohonanPelayanan[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify({ pelayanan }, null, 2), 'utf-8')
}

// GET /api/pelayanan - Get all service requests with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const jenis = searchParams.get('jenis')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let pelayanan = await readPelayanan()

    // Apply filters
    if (jenis) {
      pelayanan = pelayanan.filter(p => p.jenis === jenis)
    }

    if (status) {
      pelayanan = pelayanan.filter(p => p.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      pelayanan = pelayanan.filter(p => 
        p.nama.toLowerCase().includes(searchLower) ||
        p.email.toLowerCase().includes(searchLower)
      )
    }

    // Sort by createdAt descending (newest first)
    pelayanan.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ pelayanan })
  } catch (error) {
    console.error('Error fetching pelayanan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pelayanan' },
      { status: 500 }
    )
  }
}

// POST /api/pelayanan - Create new service request
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const pelayanan = await readPelayanan()

    const newPelayanan: PermohonanPelayanan = {
      id: String(Date.now()),
      jenis: body.jenis,
      nama: body.nama,
      email: body.email,
      telepon: body.telepon,
      detail: body.detail || {},
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    pelayanan.push(newPelayanan)
    await writePelayanan(pelayanan)

    return NextResponse.json({ pelayanan: newPelayanan }, { status: 201 })
  } catch (error) {
    console.error('Error creating pelayanan:', error)
    return NextResponse.json(
      { error: 'Failed to create pelayanan' },
      { status: 500 }
    )
  }
}

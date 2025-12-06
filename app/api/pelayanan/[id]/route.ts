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

// GET /api/pelayanan/[id] - Get single service request by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const pelayanan = await readPelayanan()
    const item = pelayanan.find(p => p.id === params.id)

    if (!item) {
      return NextResponse.json({ error: 'Pelayanan not found' }, { status: 404 })
    }

    return NextResponse.json({ pelayanan: item })
  } catch (error) {
    console.error('Error fetching pelayanan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pelayanan' },
      { status: 500 }
    )
  }
}

// PUT /api/pelayanan/[id] - Update service request (process/complete/reject)
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
    const pelayanan = await readPelayanan()
    const index = pelayanan.findIndex(p => p.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: 'Pelayanan not found' }, { status: 404 })
    }

    // Handle process action
    if (body.action === 'process') {
      pelayanan[index] = {
        ...pelayanan[index],
        status: 'in-progress',
        processedAt: new Date().toISOString(),
        processedBy: session.user?.email || 'admin',
      }
    } 
    // Handle complete action
    else if (body.action === 'complete') {
      pelayanan[index] = {
        ...pelayanan[index],
        status: 'completed',
        catatan: body.catatan || '',
        processedAt: new Date().toISOString(),
        processedBy: session.user?.email || 'admin',
      }
    }
    // Handle reject action
    else if (body.action === 'reject') {
      pelayanan[index] = {
        ...pelayanan[index],
        status: 'rejected',
        catatan: body.catatan || 'Rejected by admin',
        processedAt: new Date().toISOString(),
        processedBy: session.user?.email || 'admin',
      }
    }
    // Handle general update
    else {
      pelayanan[index] = {
        ...pelayanan[index],
        ...body,
        id: params.id, // Preserve ID
        createdAt: pelayanan[index].createdAt, // Preserve creation date
      }
    }

    await writePelayanan(pelayanan)

    return NextResponse.json({ pelayanan: pelayanan[index] })
  } catch (error) {
    console.error('Error updating pelayanan:', error)
    return NextResponse.json(
      { error: 'Failed to update pelayanan' },
      { status: 500 }
    )
  }
}

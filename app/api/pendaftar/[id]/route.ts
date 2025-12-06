import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { Pendaftar } from '@/lib/types/pendaftar'

const DATA_FILE = join(process.cwd(), 'data', 'pendaftar.json')

// GET /api/pendaftar/[id] - Get single pendaftar by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)
    const pendaftar = data.pendaftar.find((p: Pendaftar) => p.id === params.id)

    if (!pendaftar) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Pendaftar not found',
            timestamp: new Date().toISOString()
          }
        },
        { status: 404 }
      )
    }

    return NextResponse.json({ pendaftar }, { status: 200 })
  } catch (error) {
    console.error('Error reading pendaftar:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch pendaftar data',
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    )
  }
}

// PUT /api/pendaftar/[id] - Update pendaftar (approve/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { action, alasanReject, processedBy } = body

    // Validate action
    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid action. Must be "approve" or "reject"',
            timestamp: new Date().toISOString()
          }
        },
        { status: 400 }
      )
    }

    // Validate reject reason
    if (action === 'reject' && !alasanReject) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Alasan reject is required when rejecting',
            timestamp: new Date().toISOString()
          }
        },
        { status: 400 }
      )
    }

    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)
    const pendaftarIndex = data.pendaftar.findIndex((p: Pendaftar) => p.id === params.id)

    if (pendaftarIndex === -1) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Pendaftar not found',
            timestamp: new Date().toISOString()
          }
        },
        { status: 404 }
      )
    }

    const pendaftar = data.pendaftar[pendaftarIndex]

    // Check if already processed
    if (pendaftar.status !== 'pending') {
      return NextResponse.json(
        {
          error: {
            code: 'CONFLICT',
            message: `Pendaftar has already been ${pendaftar.status}`,
            timestamp: new Date().toISOString()
          }
        },
        { status: 409 }
      )
    }

    // Update pendaftar based on action
    const now = new Date().toISOString()
    if (action === 'approve') {
      pendaftar.status = 'approved'
      pendaftar.processedAt = now
      pendaftar.processedBy = processedBy || 'admin'
    } else if (action === 'reject') {
      pendaftar.status = 'rejected'
      pendaftar.alasanReject = alasanReject
      pendaftar.processedAt = now
      pendaftar.processedBy = processedBy || 'admin'
    }

    data.pendaftar[pendaftarIndex] = pendaftar

    await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ pendaftar }, { status: 200 })
  } catch (error) {
    console.error('Error updating pendaftar:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update pendaftar',
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    )
  }
}

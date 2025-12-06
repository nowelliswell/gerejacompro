import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { Pendaftar } from '@/lib/types/pendaftar'

const DATA_FILE = join(process.cwd(), 'data', 'pendaftar.json')

// GET /api/pendaftar - Get all pendaftar with optional status filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const statusFilter = searchParams.get('status')

    const fileContent = await readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(fileContent)
    let pendaftar: Pendaftar[] = data.pendaftar || []

    // Filter by status if provided
    if (statusFilter && ['pending', 'approved', 'rejected'].includes(statusFilter)) {
      pendaftar = pendaftar.filter(p => p.status === statusFilter)
    }

    // Sort by createdAt descending (newest first)
    pendaftar.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

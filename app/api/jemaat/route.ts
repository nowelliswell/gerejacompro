import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { readData, writeData } from '@/lib/utils/db'
import { Jemaat } from '@/lib/types/jemaat'
import { z } from 'zod'

// Validation schema for Jemaat
const jemaatSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().min(10, 'Nomor telepon tidak valid'),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']),
  statusPernikahan: z.enum(['Belum Menikah', 'Menikah', 'Duda/Janda']),
  tanggalBergabung: z.string().min(1, 'Tanggal bergabung wajib diisi'),
  status: z.enum(['active', 'inactive']).default('active'),
  komunitasIds: z.array(z.string()).default([]),
})

// GET /api/jemaat - Get all jemaat with optional search
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const data = await readData<{ jemaat: Jemaat[] }>('jemaat')
    let jemaatList = data.jemaat || []

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase()
      jemaatList = jemaatList.filter(
        (j) =>
          j.nama.toLowerCase().includes(searchLower) ||
          j.email.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const total = jemaatList.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = jemaatList.slice(startIndex, endIndex)

    return NextResponse.json({
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching jemaat:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch jemaat data',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    )
  }
}

// POST /api/jemaat - Create new jemaat
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validationResult = jemaatSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: validationResult.error.errors,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 }
      )
    }

    const data = await readData<{ jemaat: Jemaat[] }>('jemaat')
    const jemaatList = data.jemaat || []

    // Check for duplicate email
    const existingJemaat = jemaatList.find((j) => j.email === validationResult.data.email)
    if (existingJemaat) {
      return NextResponse.json(
        {
          error: {
            code: 'DUPLICATE_EMAIL',
            message: 'Email sudah terdaftar',
            timestamp: new Date().toISOString(),
          },
        },
        { status: 409 }
      )
    }

    // Generate new ID
    const maxId = jemaatList.reduce((max, j) => Math.max(max, parseInt(j.id) || 0), 0)
    const newId = (maxId + 1).toString()

    const now = new Date().toISOString()
    const newJemaat: Jemaat = {
      id: newId,
      ...validationResult.data,
      createdAt: now,
      updatedAt: now,
      createdBy: session.user?.email || 'admin',
    }

    jemaatList.push(newJemaat)
    await writeData('jemaat', { jemaat: jemaatList })

    return NextResponse.json(
      { data: newJemaat, message: 'Jemaat berhasil ditambahkan' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating jemaat:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create jemaat',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { readData, writeData } from '@/lib/utils/db'
import { Jemaat } from '@/lib/types/jemaat'
import { z } from 'zod'

// Validation schema for Jemaat update
const jemaatUpdateSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi').optional(),
  email: z.string().email('Email tidak valid').optional(),
  telepon: z.string().min(10, 'Nomor telepon tidak valid').optional(),
  alamat: z.string().min(1, 'Alamat wajib diisi').optional(),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi').optional(),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']).optional(),
  statusPernikahan: z.enum(['Belum Menikah', 'Menikah', 'Duda/Janda']).optional(),
  tanggalBergabung: z.string().min(1, 'Tanggal bergabung wajib diisi').optional(),
  status: z.enum(['active', 'inactive']).optional(),
  komunitasIds: z.array(z.string()).optional(),
})

// GET /api/jemaat/[id] - Get single jemaat by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const data = await readData<{ jemaat: Jemaat[] }>('jemaat')
    const jemaat = data.jemaat?.find((j) => j.id === params.id)

    if (!jemaat) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Jemaat tidak ditemukan',
            timestamp: new Date().toISOString(),
          },
        },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: jemaat })
  } catch (error) {
    console.error('Error fetching jemaat:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch jemaat',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    )
  }
}

// PUT /api/jemaat/[id] - Update jemaat by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const validationResult = jemaatUpdateSchema.safeParse(body)
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
    const jemaatIndex = jemaatList.findIndex((j) => j.id === params.id)

    if (jemaatIndex === -1) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Jemaat tidak ditemukan',
            timestamp: new Date().toISOString(),
          },
        },
        { status: 404 }
      )
    }

    // Check for duplicate email if email is being updated
    if (validationResult.data.email && validationResult.data.email !== jemaatList[jemaatIndex].email) {
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
    }

    // Update jemaat
    const updatedJemaat: Jemaat = {
      ...jemaatList[jemaatIndex],
      ...validationResult.data,
      updatedAt: new Date().toISOString(),
    }

    jemaatList[jemaatIndex] = updatedJemaat
    await writeData('jemaat', { jemaat: jemaatList })

    return NextResponse.json({
      data: updatedJemaat,
      message: 'Jemaat berhasil diperbarui',
    })
  } catch (error) {
    console.error('Error updating jemaat:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update jemaat',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    )
  }
}

// DELETE /api/jemaat/[id] - Delete jemaat by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const jemaatIndex = jemaatList.findIndex((j) => j.id === params.id)

    if (jemaatIndex === -1) {
      return NextResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Jemaat tidak ditemukan',
            timestamp: new Date().toISOString(),
          },
        },
        { status: 404 }
      )
    }

    // Remove jemaat
    jemaatList.splice(jemaatIndex, 1)
    await writeData('jemaat', { jemaat: jemaatList })

    return NextResponse.json({
      message: 'Jemaat berhasil dihapus',
    })
  } catch (error) {
    console.error('Error deleting jemaat:', error)
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to delete jemaat',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    )
  }
}

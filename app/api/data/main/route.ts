import { NextResponse } from 'next/server'
import { getMainData } from '@/lib/data/main'

// API route to fetch main data
export async function GET() {
  try {
    const data = await getMainData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in /api/data/main:', error)
    return NextResponse.json(
      { error: 'Failed to fetch main data' },
      { status: 500 }
    )
  }
} 
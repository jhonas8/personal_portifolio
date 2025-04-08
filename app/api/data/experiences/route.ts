import { NextResponse } from 'next/server'
import { getExperiencesData } from '@/lib/data/experiences'

// API route to fetch experiences data
export async function GET() {
  try {
    const data = await getExperiencesData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in /api/data/experiences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experiences data' },
      { status: 500 }
    )
  }
} 
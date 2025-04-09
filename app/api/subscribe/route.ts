import { NextResponse } from 'next/server'
import { googleSheetsClient } from '@/lib/google/sheets'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email } = body
    
    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Add the subscription to the sheet
    const success = await googleSheetsClient.addSubscriber(email)
    
    if (!success) {
      throw new Error('Failed to add subscriber to sheet')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in /api/subscribe:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
} 
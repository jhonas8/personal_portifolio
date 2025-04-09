import { NextResponse } from 'next/server'
import { googleSheetsClient } from '@/lib/google/sheets-fixed'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, message } = body
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    
    // Add the contact message to the sheet
    const success = await googleSheetsClient.addContactMessage(name, email, message)
    
    if (!success) {
      throw new Error('Failed to add contact message to sheet')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in /api/contact:', error)
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    )
  }
} 
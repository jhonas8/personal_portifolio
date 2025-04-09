import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    envVars: {
      blogId: process.env.WISP_BLOG_ID || 'Not set',
    }
  });
} 
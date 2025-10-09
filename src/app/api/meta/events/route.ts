import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Environment variables
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE

// Hash user data for privacy
function hashUserData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

// Prepare user data for API
function prepareUserData(userData: Record<string, unknown>): Record<string, unknown> {
  if (!userData) return {}

  const prepared: Record<string, unknown> = {}

  if (userData.email) {
    prepared.em = [hashUserData(userData.email as string)]
  }

  if (userData.phone) {
    // Remove all non-numeric characters and hash
    const cleanPhone = (userData.phone as string).replace(/\D/g, '')
    if (cleanPhone) {
      prepared.ph = [hashUserData(cleanPhone)]
    }
  }

  if (userData.firstName) {
    prepared.fn = [hashUserData(userData.firstName as string)]
  }

  if (userData.lastName) {
    prepared.ln = [hashUserData(userData.lastName as string)]
  }

  return prepared
}

// Send events to Meta Conversions API
export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Meta Pixel ID and Access Token are required' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { events, testEventCode } = body

    if (!events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Events array is required' },
        { status: 400 }
      )
    }

    // Get client IP and User Agent for better matching
    const clientIp = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Prepare events with server-side data
    const preparedEvents = events.map((event: Record<string, unknown>) => ({
      event_name: event.eventName,
      event_time: event.eventTime || Math.floor(Date.now() / 1000),
      event_id: event.eventId,
      event_source_url: event.eventSourceUrl || 'https://ewejose.com',
      action_source: 'website',
      user_data: {
        ...prepareUserData(event.userData as Record<string, unknown>),
        client_ip_address: clientIp,
        client_user_agent: userAgent
      },
      custom_data: event.customData
    }))

    // Send to Meta Conversions API
    const response = await fetch(`https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: preparedEvents,
        access_token: META_ACCESS_TOKEN,
        ...(testEventCode || META_TEST_EVENT_CODE ? { test_event_code: testEventCode || META_TEST_EVENT_CODE } : {})
      })
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta Conversions API Error:', result)
      return NextResponse.json(
        { error: 'Failed to send events to Meta', details: result },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      eventsReceived: events.length,
      response: result
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    pixelId: META_PIXEL_ID ? 'configured' : 'missing',
    accessToken: META_ACCESS_TOKEN ? 'configured' : 'missing',
    testEventCode: META_TEST_EVENT_CODE ? 'configured' : 'missing'
  })
}

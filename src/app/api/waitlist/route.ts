import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const segmentId = process.env.RESEND_SEGMENT_ID;
    
    if (!resendApiKey) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!segmentId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Step 1: Add contact to Resend
    const createContactResponse = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      }),
    });
    
    const addSegmentResponse = await fetch(`https://api.resend.com/contacts/${email}/segments/${segmentId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      }
});

    if (!addSegmentResponse.ok) {
      const errorData = await addSegmentResponse.text();
      return NextResponse.json({ success: false }, { status: 400 });
    }

    let segmentData = {};
    try {
      segmentData = await addSegmentResponse.json();
    } catch {
      // Response was ok but not JSON, which is fine
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}


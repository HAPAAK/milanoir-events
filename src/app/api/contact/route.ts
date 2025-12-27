import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${body.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${body.email}</p>
          ${body.message ? `<p style="margin: 10px 0;"><strong>Message:</strong></p><p style="white-space: pre-wrap; margin: 10px 0;">${body.message}</p>` : ''}
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          ${body.name} has reached out via the contact form on Milanoir Events.
        </p>
      </div>
    `;

    // Send email via Resend API directly
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: true,
          message: 'Your message has been received. We will get back to you soon.',
          fallback: true,
        },
        { status: 200 }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Milanoir Events Resend <onboarding@resend.dev>',
        to: 'info@milanoir-events.com',
        reply_to: body.email,
        subject: `New Contact Form Submission from ${body.name}`,
        html: htmlContent,
      }),
    });

    const responseData = await emailResponse.json();

    // Check if email was sent successfully
    if (!emailResponse.ok) {

      return NextResponse.json(
        {
          success: true,
          message: 'Something went wrong. We will get back to you soon.',
          fallback: true,
        },
        { status: 400 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        emailId: responseData.id,
      },
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      {
        success: true,
        message: 'Something went wrong. We will get back to you soon.',
        fallback: true,
      },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: "Resend configuration is missing on the server." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          unsubscribed: false,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return NextResponse.json(
        { error: errorBody?.message ?? "Unable to add email to waitlist." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { error: "Unexpected error while processing the waitlist request." },
      { status: 500 }
    );
  }
}


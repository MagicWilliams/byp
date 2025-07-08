// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN;

  const res = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': MAILERLITE_API_TOKEN!,
    },
    body: JSON.stringify({
      email,
      // name: "Optional Name",
      resubscribe: true, // avoids error if email already exists
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}

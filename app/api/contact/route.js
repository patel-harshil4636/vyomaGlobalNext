// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    // 👉 Here you can do:
    // - save to MongoDB
    // - send email
    // - log in server
    console.log('New contact message:', body);

    return NextResponse.json(
      { success: true, msg: 'Message received!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, msg: 'Something went wrong' },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  return NextResponse.json({
    hasUri: !!uri,
    // just show length, not the value (for safety)
    uriLength: uri ? uri.length : 0,
  });
}

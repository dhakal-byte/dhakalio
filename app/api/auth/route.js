import { NextResponse } from 'next/server'
const VALID = (process.env.ACCESS_CODES || 'cee67,ioe67').split(',').map(c => c.trim())
export async function POST(req) {
  try {
    const { code } = await req.json()
    if (VALID.includes(code?.trim())) return NextResponse.json({ ok: true })
    return NextResponse.json({ ok: false, message: 'Wrong code. DM @dhakalbytes on Instagram!' }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}

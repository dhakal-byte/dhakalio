import { NextResponse } from 'next/server'

const VALID_CODES = (process.env.ACCESS_CODES || 'cee67,ioe67').split(',').map(c => c.trim())

export async function POST(req) {
  try {
    const { code } = await req.json()
    if (!code) return NextResponse.json({ ok: false, message: 'No code provided' }, { status: 400 })

    if (VALID_CODES.includes(code.trim())) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, message: 'Wrong code. DM @dhakalbytes on Instagram!' }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}

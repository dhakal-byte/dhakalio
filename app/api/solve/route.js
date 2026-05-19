import { NextResponse } from 'next/server'
const GROQ_KEY = process.env.GROQ_API_KEY
export async function POST(req) {
  try {
    const { image, subject } = await req.json()
    if (!image) return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    const hint = subject && subject !== 'auto' ? `Subject: ${subject}. ` : ''
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image}` } },
            { type: 'text', text: `You are an expert Nepal CEE/IOE entrance exam tutor. ${hint}
For EACH question use EXACTLY this format:

Q1. [question text]
Answer: [correct option]
Solution: [max 3-4 lines, plain text only]
Topic: [chapter name]

---

STRICT RULES:
- NO dollar signs, NO backslash, NO asterisks, NO hashtags
- Write math plainly: v^2/r, 1/2mv^2, sqrt(2gR)
- Each question separated by ---
- Keep solutions SHORT and CLEAR for +2 students` }
          ]
        }]
      })
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || 'No response.' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

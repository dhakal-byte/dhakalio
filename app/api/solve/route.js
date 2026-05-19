import { NextResponse } from 'next/server'

const GROQ_KEY = process.env.GROQ_API_KEY

export async function POST(req) {
  try {
    const { image, subject } = await req.json()
    if (!image) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    const hint = subject && subject !== 'auto' ? `Subject: ${subject}. ` : ''

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: `data:image/jpeg;base64,${image}` }
              },
              {
                type: 'text',
                text: `You are an expert Nepal CEE/IOE entrance exam tutor. ${hint}

Solve all questions in this image. Follow this EXACT format for each question:

Q1. [question number]
Answer: [correct option letter and text]
Solution: [step by step working in plain text, use normal text like (1/2)mv^2 instead of LaTeX]
Topic: [chapter name]

Rules:
- NO markdown, NO asterisks, NO hashtags, NO LaTeX dollar signs
- Write math in plain text: write "1/2 mv^2" not "$\\frac{1}{2}mv^2$"
- Keep it clean and simple like a textbook solution
- Be concise and clear for +2 level Nepal students`
              }
            ]
          }
        ]
      })
    })

    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    const text = data.choices?.[0]?.message?.content || 'No response.'
    return NextResponse.json({ result: text })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Failed to solve' }, { status: 500 })
  }
}

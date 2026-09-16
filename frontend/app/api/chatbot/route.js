import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `
You are a friendly, cheerful, and helpful AI assistant for a barbershop named "HAIRCUT". 
Your goal is to answer customer questions and help them.
Keep your answers concise and to the point, usually in 1-2 sentences.
Use simple Hindi or Hinglish where possible.

Here is the information about the barbershop:
- Shop Name: HAIRCUT
- Owner: Anushka, Mobile number = 9336170698
- Location: 273016 Uttar Pradesh, India.
- Working Hours: Monday to Friday, 9 AM to 9 PM. Saturday and Sunday are CLOSED.
- Services and Prices: 
  - Haircut: From ₹15
  - Beard Trim: From ₹15
  - Mans Shave: From ₹15
  - Hair Dyeing: From ₹15
  - Mustache: From ₹15
  - Stacking: From ₹15
- How to Book: To book an appointment, the user must be logged in. They can click the "Appointment" button on the website.
- Your Name: You can refer to yourself as "Barber Bot".

IMPORTANT RULE: Strictly stick to barbershop-related topics. If asked about anything else (like politics, science, personal opinions), you MUST politely decline by saying, "Main sirf HAIRCUT barbershop se jude sawalon ka jawab de sakta hoon."

If a user asks a question you don't know the answer to, politely say, "Iske baare mein mujhe jaankari nahi hai, lekin aap hamare contact page par jaakar humse pooch sakte hain."
Do not make up information.
`;

export async function POST(request) {
    console.log("DEBUG - GROQ_API_KEY status:", process.env.GROQ_API_KEY ? `Loaded (starts with ${process.env.GROQ_API_KEY.substring(0, 4)}...)` : "UNDEFINED");
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const models = [
            "openai/gpt-oss-20b",
            "openai/gpt-oss-120b",
            "groq/compound-mini",
        ];
        let completion = null;
        let lastError = null;

        for (const model of models) {
            try {
                completion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    model: model,
                });
                break;
            } catch (err) {
                lastError = err;
                console.warn(`Model ${model} failed, trying next model:`, err?.message || err);
            }
        }

        if (!completion) {
            throw lastError || new Error("All Groq models failed");
        }

        const botReply = completion.choices[0]?.message?.content || "Sorry, I couldn't process that.";

        return NextResponse.json({ reply: botReply });

    } catch (error) {
        console.error('Groq API Error:', error);
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}

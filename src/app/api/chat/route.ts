import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/portfolioData";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: groq("llama-3.3-70b-versatile"),
        system: SYSTEM_PROMPT,
        messages,
    });

    return result.toTextStreamResponse();
}

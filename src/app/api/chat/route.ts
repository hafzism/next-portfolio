import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/portfolioData";
import { headers } from "next/headers";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Simple in-memory rate limiter (resets on server restart/cold start)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 20;
const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    // Get IP address from headers
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "anonymous";
    // Check rate limit
    const now = Date.now();
    const userRate = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userRate.lastReset > RESET_INTERVAL) {
        userRate.count = 0;
        userRate.lastReset = now;
    }

    if (userRate.count >= LIMIT) {
        return new Response("Daily message limit reached (20).", { status: 429 });
    }

    // Increment count
    userRate.count++;
    rateLimitMap.set(ip, userRate);

    const { messages } = await req.json();

    const result = streamText({
        model: groq("llama-3.3-70b-versatile"),
        system: SYSTEM_PROMPT,
        messages,
    });

    return result.toTextStreamResponse();
}

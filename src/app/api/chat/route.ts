import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LEGAL_SYSTEM_PROMPT } from "@/lib/legal-prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Xabarlar kerak" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      systemInstruction: LEGAL_SYSTEM_PROMPT,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Server xatosi";
    return Response.json({ error: message }, { status: 500 });
  }
}

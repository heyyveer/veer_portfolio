import { env } from "@/lib/env";
import { getOpenAI } from "@/lib/ai/openai";
import { SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { buildContext } from "@/lib/ai/search";
import { respond } from "@/lib/ai/responder";

type ChatMessage = { role: "user" | "assistant"; content: string };

const encoder = new TextEncoder();

function sseChunk(event: string, data: unknown) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

async function streamLocal(query: string): Promise<ReadableStream<Uint8Array>> {
  const answer = respond(query);
  return new ReadableStream({
    async start(controller) {
      // Stream char-by-char (with small bursts) so the UX matches the OpenAI path.
      let i = 0;
      const step = 3;
      while (i < answer.length) {
        controller.enqueue(
          sseChunk("delta", { text: answer.slice(i, i + step) }),
        );
        i += step;
        await new Promise((r) => setTimeout(r, 14));
      }
      controller.enqueue(sseChunk("done", { ok: true }));
      controller.close();
    },
  });
}

async function streamOpenAI(
  query: string,
  history: ChatMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const client = getOpenAI();
  if (!client) return streamLocal(query);

  const context = buildContext(query);

  return new ReadableStream({
    async start(controller) {
      try {
        const stream = await client.chat.completions.create({
          model: env.OPENAI_MODEL,
          stream: true,
          temperature: 0.3,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "system",
              content: `CONTEXT (extracted from Soumya's catalogue):\n${context}`,
            },
            ...history.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: query },
          ],
        });

        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(sseChunk("delta", { text: delta }));
        }
        controller.enqueue(sseChunk("done", { ok: true }));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown error";
        controller.enqueue(sseChunk("error", { message: msg }));
        // Fallback gracefully to the deterministic responder.
        const fallback = respond(query);
        controller.enqueue(sseChunk("delta", { text: "\n\n" + fallback }));
        controller.enqueue(sseChunk("done", { ok: true }));
      } finally {
        controller.close();
      }
    },
  });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    message?: string;
    history?: ChatMessage[];
  } | null;

  const query = body?.message?.trim();
  if (!query) {
    return new Response("Missing message", { status: 400 });
  }

  const history = Array.isArray(body?.history) ? body!.history : [];

  const stream = env.hasOpenAI
    ? await streamOpenAI(query, history)
    : await streamLocal(query);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

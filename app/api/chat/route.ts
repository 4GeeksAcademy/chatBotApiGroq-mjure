import { NextResponse } from "next/server";

type ChatRole = "system" | "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatRequestBody = {
  message?: string;
  history?: ChatMessage[];
};

type GroqUsage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const candidate = item as ChatMessage;
      const validRole =
        candidate.role === "assistant" ||
        candidate.role === "user" ||
        candidate.role === "system";

      return validRole && typeof candidate.content === "string";
    })
    .map((item) => ({
      role: item.role,
      content: item.content.trim(),
    }))
    .filter((item) => item.content.length > 0);
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta GROQ_API_KEY en variables de entorno." },
      { status: 500 }
    );
  }

  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Body invalido: se esperaba JSON." },
      { status: 400 }
    );
  }

  const userMessage = body.message?.trim();
  if (!userMessage) {
    return NextResponse.json(
      { error: "El mensaje no puede estar vacio." },
      { status: 400 }
    );
  }

  const history = sanitizeHistory(body.history).slice(-12);
  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "Eres un asistente tecnico util. Responde en espanol con claridad, estructura corta y ejemplos cuando aporte valor.",
    },
    ...history,
    { role: "user", content: userMessage },
  ];

  try {
    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    const payload = (await groqResponse.json().catch(() => null)) as
      | {
          choices?: Array<{ message?: { content?: string } }>;
          error?: { message?: string };
          usage?: GroqUsage;
        }
      | null;

    if (!groqResponse.ok) {
      return NextResponse.json(
        {
          error:
            payload?.error?.message ||
            "Groq devolvio un error al procesar la solicitud.",
        },
        { status: groqResponse.status }
      );
    }

    const reply = payload?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "Groq no devolvio contenido en la respuesta." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply,
      usage: {
        promptTokens: payload?.usage?.prompt_tokens ?? 0,
        completionTokens: payload?.usage?.completion_tokens ?? 0,
        totalTokens: payload?.usage?.total_tokens ?? 0,
      },
      model: DEFAULT_MODEL,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el servicio de Groq." },
      { status: 500 }
    );
  }
}

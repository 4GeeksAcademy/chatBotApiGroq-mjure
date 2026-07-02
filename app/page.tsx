"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type UiRole = "assistant" | "user";

type UiMessage = {
  id: string;
  role: UiRole;
  content: string;
  timestamp: string;
};

type ApiHistoryMessage = {
  role: "assistant" | "user";
  content: string;
};

const INITIAL_MESSAGES: UiMessage[] = [
  {
    id: "m-1",
    role: "assistant",
    content:
      "Hola! Soy tu asistente inteligente. En que puedo ayudarte hoy con tu flujo de trabajo o consultas tecnicas?",
    timestamp: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

function createMessage(role: UiRole, content: string): UiMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export default function Home() {
  const [messages, setMessages] = useState<UiMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const feedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!feedRef.current) {
      return;
    }

    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages, isSending]);

  const canSend = input.trim().length > 0 && !isSending;

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend(event as unknown as FormEvent<HTMLFormElement>);
    }
  };

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();
    if (!text || isSending) {
      return;
    }

    const userMessage = createMessage("user", text);
    const historyForApi: ApiHistoryMessage[] = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyForApi,
        }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo obtener respuesta de Groq.");
      }

      if (!payload.reply) {
        throw new Error("Groq no devolvio contenido en la respuesta.");
      }

      setMessages((previous) => [...previous, createMessage("assistant", payload.reply || "")]);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Error inesperado al conectar con Groq.";

      setError(message);
      setMessages((previous) => [
        ...previous,
        createMessage(
          "assistant",
          "No pude responder en este momento. Revisa GROQ_API_KEY y vuelve a intentar."
        ),
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="phone-frame">
        <header className="topbar">
          <button className="icon-btn" aria-label="Abrir menu">
            &#9776;
          </button>
          <h1>AI Assistant</h1>
          <button className="icon-btn" aria-label="Mas opciones">
            &#8942;
          </button>
        </header>

        <section className="chat-feed" aria-label="Conversacion" ref={feedRef}>
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <article
                key={message.id}
                className={`message-row ${isUser ? "user" : "ai"}`}
              >
                <div className="sender-label">{isUser ? "Tu" : "Asistente de IA"}</div>
                <div className={`bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
                  <p>{message.content}</p>
                </div>
                <time className="timestamp">{message.timestamp}</time>
              </article>
            );
          })}

          {isSending ? (
            <article className="message-row ai" aria-live="polite">
              <div className="sender-label">Asistente de IA</div>
              <div className="bubble ai-bubble typing-bubble">Escribiendo...</div>
            </article>
          ) : null}
        </section>

        <form className="chat-input-zone" onSubmit={handleSend}>
          <label htmlFor="chat-input" className="sr-only">
            Escribe tu mensaje
          </label>
          <textarea
            id="chat-input"
            className="chat-input"
            placeholder="Escribe tu mensaje aqui"
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
          />
          <button className="send-btn" aria-label="Enviar" disabled={!canSend} type="submit">
            &#10148;
          </button>
        </form>
        {error ? <p className="status-note">{error}</p> : null}

        <nav className="bottom-nav" aria-label="Navegacion principal">
          <button className="nav-item active" aria-label="Chat">
            &#9776;
          </button>
          <button className="nav-item" aria-label="Explorar">
            &#9673;
          </button>
          <button className="nav-item" aria-label="Perfil">
            &#9787;
          </button>
        </nav>
      </main>
    </div>
  );
}

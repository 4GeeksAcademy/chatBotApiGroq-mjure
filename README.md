# chatBotApiGroq-mjure

Interfaz de chat en Next.js conectada a Groq mediante un endpoint server-side.

## Requisitos

- Node.js 20+
- Una API key de Groq

## Configuracion

1. Copia variables de entorno:

```bash
cp .env.example .env.local
```

2. Define tu API key en `.env.local`:

```bash
GROQ_API_KEY=tu_api_key_real
GROQ_MODEL=llama-3.3-70b-versatile
```

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Arquitectura de la integracion

- Frontend: `app/page.tsx` envia mensajes a `/api/chat`.
- Backend: `app/api/chat/route.ts` llama a `https://api.groq.com/openai/v1/chat/completions`.
- Seguridad: la API key se mantiene solo en el servidor.
const express = require("express");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");
const { KNOWLEDGE_BASE } = require("./knowledge-base");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// System prompt for the AI assistant
const SYSTEM_PROMPT = `Eres el asistente virtual de Suqiée Repostería (también conocida como "Los Pasteles de Luzma").

REGLAS DE IDIOMA:
- Detecta el idioma del último mensaje del usuario.
- Responde SIEMPRE en el mismo idioma que el usuario.
- Si el usuario escribe en español, responde en español.
- Si el usuario escribe en inglés, responde en inglés.
- Nunca mezcles idiomas en una misma respuesta.

TONO Y ESTILO:
- Cálido, cercano y amigable, como si fueras parte del equipo de Suqiée.
- Usa emojis ocasionalmente para dar calidez (🎂🧁💕).
- Sé conciso pero informativo.
- Si no sabes algo específico, ofrece contactar directamente a la sucursal.
- Mantén las respuestas enfocadas y breves (máximo 4-5 oraciones) a menos que se necesite más detalle.

BASE DE CONOCIMIENTO:
${KNOWLEDGE_BASE}

Si te preguntan algo no cubierto en la base de conocimiento:
1. Reconoce la pregunta amablemente
2. Sugiere contactar por Instagram @suqieereposteria o por WhatsApp
3. Proporciona el teléfono si es relevante: 662 216 0759
`;

// API endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const reply = response.content[0].text;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Claude API error:", error.message);
    return res.status(500).json({ error: "Failed to get response from AI" });
  }
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Suqiée Chatbot server running on port ${PORT}`);
});

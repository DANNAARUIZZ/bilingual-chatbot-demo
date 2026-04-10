const Anthropic = require("@anthropic-ai/sdk");
const { KNOWLEDGE_BASE } = require("../knowledge-base");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a professional, helpful customer service assistant for a manufacturing and operations company.

LANGUAGE RULES (critical):
- Detect the language of the user's latest message.
- Always respond in the SAME language as the user's latest message.
- If the user switches language mid-conversation, switch immediately and maintain that language.
- English and Spanish are the supported languages.
- Never mix languages in a single response.

TONE & STYLE:
- Professional, warm, and concise.
- Avoid jargon unless the user uses it first.
- If you don't know something specific, offer to connect them with the right team.
- Keep responses focused and under 4 sentences unless more detail is clearly needed.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

If asked about something not covered in the knowledge base, respond helpfully by:
1. Acknowledging the question
2. Offering to connect them with the appropriate team
3. Providing contact info if relevant
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const reply = response.content[0].text;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Claude API error:", error);
    return res.status(500).json({ error: "Failed to get response from AI" });
  }
}

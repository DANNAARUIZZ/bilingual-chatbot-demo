# Bilingual Customer Service Chatbot

Demo chatbot with automatic EN/ES language detection, powered by Claude AI.

---

## Deploy to Vercel (5 minutes)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variable:
   - `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
4. Deploy → get your public URL

---

## Customize the Knowledge Base

All business-specific content lives in `knowledge-base.js`.

To adapt for a client, update these sections:
- **COMPANY OVERVIEW** — what the company does
- **BUSINESS HOURS** — actual schedule
- **PRODUCTS & SERVICES** — real offerings
- **SHIPPING & DELIVERY** — actual timelines and policies
- **RETURNS & WARRANTY** — real policies
- **PRICING** — pricing structure or ranges
- **CONTACT INFORMATION** — real emails, phones, website

No other files need to change.

---

## Local Development

```bash
npm install
npm install -g vercel
vercel dev
```

Then open `http://localhost:3000`

---

## Sales Demo Script

**Opening (30 sec):**
> "Let me show you something I built — a bilingual customer service chatbot.
> Watch what happens when I switch languages mid-conversation."

**Live demo flow:**
1. Type: `"What are your business hours?"` → shows English response
2. Type: `"¿Cuánto tarda el envío?"` → switches to Spanish automatically
3. Type: `"Tell me about your warranty"` → back to English
4. Type: `"¿Tienen descuentos por volumen?"` → Spanish again

**Key talking points:**
- "It detects language automatically — no buttons, no settings"
- "It remembers the full conversation context, not just the last message"
- "This is generic demo content. For your company, we'd load your actual policies, products, and pricing"
- "Deployment is a public URL — works on any device, no app install needed"
- "Typical customization for a real client: 1–2 days of work"

**Handling objections:**
- *"We already have a chatbot"* → "How does it handle Spanish? Does it switch automatically?"
- *"Is it accurate?"* → "It only answers from the knowledge base we give it — no hallucinations about your business"
- *"What about data privacy?"* → "No conversation data is stored. Each session is independent"

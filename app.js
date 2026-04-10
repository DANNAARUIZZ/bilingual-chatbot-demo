// ============================================================
// Chatbot Frontend Logic
// ============================================================

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");

// Conversation history sent to the API (maintains session memory)
let conversationHistory = [];

// Set welcome message timestamp
document.getElementById("welcomeTime").textContent = formatTime(new Date());

// ============================================================
// Event Listeners
// ============================================================

sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// Auto-resize textarea
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 120) + "px";
});

resetBtn.addEventListener("click", resetConversation);

// ============================================================
// Core Functions
// ============================================================

async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  // Add user message to UI and history
  appendMessage(text, "user");
  conversationHistory.push({ role: "user", content: text });

  // Clear input
  userInput.value = "";
  userInput.style.height = "auto";
  setLoading(true);

  // Show typing indicator
  const typingEl = appendTypingIndicator();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversationHistory }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const reply = data.reply;

    // Add assistant reply to history
    conversationHistory.push({ role: "assistant", content: reply });

    typingEl.remove();
    appendMessage(reply, "bot");
  } catch (err) {
    typingEl.remove();
    appendMessage(
      "Sorry, something went wrong. Please try again. / Lo sentimos, algo salió mal. Por favor intenta de nuevo.",
      "bot",
      true
    );
    console.error(err);
  } finally {
    setLoading(false);
  }
}

function resetConversation() {
  conversationHistory = [];

  // Clear messages except welcome
  const messages = chatMessages.querySelectorAll(".message:not(#welcomeMsg)");
  messages.forEach((m) => m.remove());

  // Reset welcome timestamp
  document.getElementById("welcomeTime").textContent = formatTime(new Date());

  userInput.focus();
}

// ============================================================
// UI Helpers
// ============================================================

function appendMessage(text, sender, isError = false) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender === "user" ? "user-message" : "bot-message"}${isError ? " error-message" : ""}`;

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;

  const time = document.createElement("span");
  time.className = "message-time";
  time.textContent = formatTime(new Date());

  wrapper.appendChild(bubble);
  wrapper.appendChild(time);
  chatMessages.appendChild(wrapper);
  scrollToBottom();

  return wrapper;
}

function appendTypingIndicator() {
  const wrapper = document.createElement("div");
  wrapper.className = "message bot-message typing-indicator";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

  wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  scrollToBottom();

  return wrapper;
}

function setLoading(isLoading) {
  sendBtn.disabled = isLoading;
  userInput.disabled = isLoading;
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

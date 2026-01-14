const chatBox = document.getElementById('chat-box');
const inputForm = document.getElementById('input-form');
const userInput = document.getElementById('user-input');

// Append message to chat
function appendMessage(text, sender) {
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Call GLM API
async function getAIResponse(question) {
  const apiKey = "b69b2fdbfc4147eb837271b6faf40fb6.pAEpQBbFaO9Vy3U7"; // <-- Replace with your GLM API key
  const apiUrl = "https://api.z.ai/v1/generate"; // GLM endpoint

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "glm",
        prompt: `You are a Customer Support AI. Answer this question accurately:\n${question}`,
        max_tokens: 200
      })
    });

    const data = await response.json();
    return data.output_text || "Sorry, no response from AI.";
  } catch (error) {
    console.error(error);
    return "Error: Could not get AI response.";
  }
}

inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  userInput.value = '';

  appendMessage("AI is typing...", "ai"); // temporary message
  const aiMessageElements = chatBox.querySelectorAll('.ai');
  const tempMessage = aiMessageElements[aiMessageElements.length - 1];

  const aiResponse = await getAIResponse(text);
  tempMessage.textContent = aiResponse; // replace temp with actual AI response
});


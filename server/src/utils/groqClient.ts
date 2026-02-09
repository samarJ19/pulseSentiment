// groq-sdk is ESM-only, use dynamic import for CommonJS compatibility
let groqInstance: any = null;

async function getGroqClient() {
  if (!groqInstance) {
    const { default: Groq } = await import("groq-sdk");
    groqInstance = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqInstance;
}

export async function analyzeFeeds(feedbackText: string): Promise<string> {
  const groq = await getGroqClient();
  const message = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a feedback analysis expert. Analyze the following feedback submissions and provide:
1. A concise summary of key themes and sentiment patterns
2. Specific, actionable mitigation techniques to address the issues raised

Format your response as JSON with the following structure:
{
  "summary": "2-3 sentences covering main themes and sentiment",
  "mitigations": [
    {
      "issue": "specific problem identified",
      "solution": "concrete mitigation technique",
      "priority": "high|medium|low"
    }
  ]
}

Feedback data:
${feedbackText}`,
      },
    ],
  });

  const responseText = message.choices[0].message.content;

  if (!responseText) {
    throw new Error("Empty response from AI model");
  }

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to extract JSON from AI response");
  }

  return jsonMatch[0];
}

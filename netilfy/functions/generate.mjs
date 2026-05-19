export default async (req, context) => {
  try {
    const { prompt } = await req.json();
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Netlify.env.get("ANTHROPIC_API_KEY"),
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return Response.json(data);
  } catch(e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
};

export const config = { path: "/.netlify/functions/generate" };

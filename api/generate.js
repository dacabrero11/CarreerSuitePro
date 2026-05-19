export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    let prompt;
    if (typeof req.body === "string") {
      prompt = JSON.parse(req.body).prompt;
    } else if (req.body && req.body.prompt) {
      prompt = req.body.prompt;
    } else {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      prompt = JSON.parse(raw).prompt;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

   const data = await response.json();
console.log("Anthropic response:", JSON.stringify(data));
return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

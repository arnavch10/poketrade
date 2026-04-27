import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_API_KEY);

export default async function handler(req, res) {
  const { query } = req.body;

  try {
    const chatCompletion = await client.chatCompletion({
      model: "openai/gpt-oss-120b:fastest",
      messages: [
        { role: "system", content: "You are a travel guide." },
        { role: "user", content: `Give me a list of places to visit in ${query} and their historical significance.` },
      ],
    });

    const responseText = chatCompletion.choices[0].message.content;
    res.status(200).json({ result: responseText });
  } catch (err) {
    console.error("Hugging Face error:", err);
    res.status(500).json({ error: "No response from Hugging Face API" });
  }
}
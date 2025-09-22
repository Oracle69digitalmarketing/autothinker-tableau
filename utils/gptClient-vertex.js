const { VertexAI } = require('@google-cloud/vertexai');

// Load ENV
const PROJECT_ID = process.env.GCP_PROJECT_ID;
const LOCATION = process.env.GCP_LOCATION || "us-central1";
const ENDPOINT_ID = process.env.VERTEX_AI_ENDPOINT_ID;

const vertex_ai = new VertexAI({
  project: PROJECT_ID,
  location: LOCATION,
});

async function generateBusinessData(idea) {
  const prompt = `
Generate a business blueprint for this idea: "${idea}".
Return JSON with fields:
{
  "idea_name": "...",
  "category": "...",
  "SWOT_strength": 0-100,
  "SWOT_weakness": 0-100,
  "opportunity_score": 0-100,
  "threat_score": 0-100,
  "predicted_revenue": number,
  "top_actions": ["action1","action2","action3"]
}
`;

  try {
    // Use Gemini via Vertex AI
    const model = vertex_ai.preview.getGenerativeModel({
      model: "gemini-1.5-flash", // or "gemini-1.5-pro"
    });

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
    });

    const textResponse = response.candidates[0].content.parts[0].text.trim();
    return JSON.parse(textResponse);
  } catch (err) {
    console.error("Error generating with Vertex AI:", err);
    return null;
  }
}

module.exports = { generateBusinessData };

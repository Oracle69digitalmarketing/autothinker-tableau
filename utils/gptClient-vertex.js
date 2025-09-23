const { VertexAI } = require("@google-cloud/vertexai");

// === ENV CONFIG ===
const PROJECT_ID = process.env.GCP_PROJECT_ID;
const LOCATION = process.env.GCP_LOCATION || "us-central1";
const ENDPOINT_ID = process.env.VERTEX_AI_ENDPOINT_ID; // optional for deployed endpoints

if (!PROJECT_ID) {
  console.warn("[VertexAI] Missing GCP_PROJECT_ID. Check your .env configuration.");
}

const vertexAI = new VertexAI({
  project: PROJECT_ID,
  location: LOCATION,
});

/**
 * === Generate structured business blueprint data with Gemini ===
 */
async function generateBusinessData(idea) {
  const prompt = `
Generate a business blueprint for this idea: "${idea}".
Return ONLY valid JSON with this structure:
{
  "idea_name": string,
  "category": string,
  "SWOT_strength": number (0-100),
  "SWOT_weakness": number (0-100),
  "opportunity_score": number (0-100),
  "threat_score": number (0-100),
  "predicted_revenue": number,
  "top_actions": [string, string, string]
}
`;

  try {
    // Select model: either custom endpoint or direct Gemini model
    const model = vertexAI.preview.getGenerativeModel({
      model: ENDPOINT_ID ? ENDPOINT_ID : "gemini-1.5-flash",
    });

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
    });

    const outputText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Try parsing response as JSON
    try {
      return JSON.parse(outputText);
    } catch (parseErr) {
      console.warn("[VertexAI] Response was not valid JSON. Wrapping raw text.");
      return { raw_output: outputText, idea };
    }
  } catch (err) {
    console.error("[VertexAI] Generation failed:", err.response?.data || err.message);
    return null;
  }
}

module.exports = { generateBusinessData };

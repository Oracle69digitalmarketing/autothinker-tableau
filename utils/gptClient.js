const OpenAI = require("openai");
const { VertexAI } = require("@google-cloud/vertexai");
require("dotenv").config();

const useVertex = process.env.USE_VERTEX === "true";

// ---------- OpenAI Setup ----------
let openai = null;
if (!useVertex) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// ---------- Vertex Setup ----------
let vertexAI = null;
let generativeModel = null;
if (useVertex) {
  const project = process.env.GCP_PROJECT_ID;
  const location = process.env.GCP_LOCATION || "us-central1";
  vertexAI = new VertexAI({ project, location });
  generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
  });
}

// ---------- Unified generateBusinessData ----------
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
    if (useVertex) {
      // ---- Vertex path ----
      const req = {
        contents: [
          { role: "user", parts: [{ text: prompt }] }
        ]
      };
      const result = await generativeModel.generateContent(req);
      const text = result.response.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } else {
      // ---- OpenAI path ----
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an AI business blueprint generator." },
          { role: "user", content: prompt }
        ],
        max_tokens: 500,
      });

      const jsonString = response.choices[0].message.content.trim();
      return JSON.parse(jsonString);
    }
  } catch (err) {
    console.error("Error generating or parsing AI JSON:", err);
    return null;
  }
}

// ---------- Test Vertex Standalone ----------
async function testVertex() {
  if (!useVertex) {
    return { message: "Vertex AI disabled, set USE_VERTEX=true to test." };
  }

  const req = {
    contents: [
      { role: "user", parts: [{ text: "Say hello from Vertex AI (Render test)." }] }
    ]
  };

  const result = await generativeModel.generateContent(req);
  return result.response;
}

module.exports = {
  generateBusinessData,
  testVertex,
};

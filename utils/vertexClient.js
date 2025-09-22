const { VertexAI } = require("@google-cloud/vertexai");
require("dotenv").config();

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: process.env.GCP_LOCATION || "us-central1",
});

const generativeModel = vertexAI.getGenerativeModel({
  model: "gemini-1.5-flash-001"
});

async function generateBusinessData(idea, salesforceData, tableauData) {
  const prompt = \`
Generate a detailed business blueprint for this idea: "\${idea}".
Use Salesforce data: \${JSON.stringify(salesforceData)}
Use Tableau data: \${JSON.stringify(tableauData)}
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
\`;

  const req = {
    contents: [
      { role: "user", parts: [{ text: prompt }] }
    ]
  };

  const result = await generativeModel.generateContent(req);
  return result.response;
}

module.exports = { generateBusinessData };

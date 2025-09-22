// routes/ai.js
const express = require("express");
const router = express.Router();

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomScore(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post("/generate", async (req, res) => {
  const { idea } = req.body;

  const insightTemplates = [
    `Market potential analysis for "${idea}" with growth forecast.`,
    `Competitive landscape scan for "${idea}".`,
    `Risks and challenges facing "${idea}" in emerging markets.`,
    `Customer segmentation strategy for "${idea}".`,
    `Go-to-market roadmap for "${idea}" in the first 6 months.`,
    `Financial projections and ROI for "${idea}".`
  ];

  const sources = ["AutoThinker AI", "Market DB", "Analyst Engine", "Strategy Core"];
  const riskLevels = ["Low", "Medium", "High"];
  const opportunityTypes = ["Expansion", "Optimization", "Innovation", "Disruption"];

  const fakeInsights = Array.from({ length: 3 }, () => ({
    text: randomPick(insightTemplates),
    source: randomPick(sources),
    confidence: randomScore(70, 99),       // % confidence
    risk: randomPick(riskLevels),          // categorical
    opportunityScore: randomScore(50, 100),// quantifiable score
    opportunityType: randomPick(opportunityTypes)
  }));

  res.json({
    idea,
    insights: fakeInsights,
    metadata: {
      generatedAt: new Date().toISOString(),
      engine: "AutoThinker Demo AI",
    },
  });
});

module.exports = router;

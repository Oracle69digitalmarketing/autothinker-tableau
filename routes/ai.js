const express = require("express");
const router = express.Router();
const { generateBusinessData } = require("../utils/gptClient");
const { pushToSalesforce } = require("../utils/salesforce");

router.post("/generate", async (req, res) => {
  const { idea } = req.body;
  if (!idea) return res.status(400).json({ error: "Idea is required" });

  try {
    const data = await generateBusinessData(idea);
    if (!data) return res.status(500).json({ error: "AI generation failed" });

    // Push to Salesforce
    await pushToSalesforce(data);

    res.json(data);
  } catch (err) {
    console.error("Error during AI generation or Salesforce push:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { fetchSalesforceData } = require("../utils/salesforceClient"); // live client

// 🔍 Fetch Salesforce objects by idea
router.get("/data", async (req, res) => {
  try {
    const idea = req.query.idea || "";

    // Live fetch if credentials available
    const data = await fetchSalesforceData(idea);

    // Enrich placeholder with realistic CRM objects
    if (!process.env.SALESFORCE_USERNAME) {
      return res.json({
        accounts: [
          { id: "001", name: "Tech Innovators Ltd", industry: "Technology", revenue: 1500000 },
          { id: "002", name: "GreenAgro Farms", industry: "Agriculture", revenue: 850000 }
        ],
        leads: [
          { id: "L001", name: "John Doe", status: "Open", source: "Web" },
          { id: "L002", name: "Jane Smith", status: "Contacted", source: "Referral" }
        ],
        opportunities: [
          { id: "O001", name: "AI-Driven Dashboard", stage: "Prospecting", value: 50000, probability: "20%" },
          { id: "O002", name: "AgriTech Expansion", stage: "Negotiation", value: 120000, probability: "70%" }
        ]
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Salesforce /data route error:", err.message);
    res.status(500).json({ error: "Salesforce fetch failed", details: err.message });
  }
});

// ⚡ Future actions — e.g., create Lead, update Opportunity
router.post("/action", async (req, res) => {
  try {
    const { action, payload } = req.body;

    // For demo, return placeholder
    res.json({
      status: "SUCCESS_PLACEHOLDER",
      action,
      payload,
      message: "This will connect to Salesforce API when credentials are added"
    });
  } catch (err) {
    console.error("Salesforce /action route error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

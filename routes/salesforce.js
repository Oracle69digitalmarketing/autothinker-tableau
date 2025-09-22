const express = require("express");
const router = express.Router();
const { fetchSalesforceData, performSalesforceAction } = require("../utils/salesforceClient"); // adjust path if needed

/**
 * GET /api/salesforce/data
 * Fetch Salesforce objects (Accounts & Opportunities) by idea
 * Query param: idea
 */
router.get("/data", async (req, res) => {
  try {
    const idea = req.query.idea || "";
    const data = await fetchSalesforceData(idea);
    res.json(data);
  } catch (err) {
    console.error("[Salesforce Route] GET /data error:", err.message);
    res.status(500).json({ error: "Failed to fetch Salesforce data", details: err.message });
  }
});

/**
 * POST /api/salesforce/action
 * Placeholder route for future Salesforce actions (create/update)
 */
router.post("/action", async (req, res) => {
  try {
    const payload = req.body;
    const result = await performSalesforceAction(payload);
    res.json(result);
  } catch (err) {
    console.error("[Salesforce Route] POST /action error:", err.message);
    res.status(500).json({ error: "Failed to perform Salesforce action", details: err.message });
  }
});

module.exports = router;

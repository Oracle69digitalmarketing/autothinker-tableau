const express = require("express");
const router = express.Router();
const { fetchSalesforceData } = require("../utils/salesforceClient"); // update path if needed

// Fetch Salesforce objects by idea
router.get("/data", async (req, res) => {
  try {
    const idea = req.query.idea || "";
    const data = await fetchSalesforceData(idea);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder for future Salesforce actions
router.post("/action", async (req, res) => {
  try {
    // TODO: implement future Salesforce API actions
    res.json({ status: "SUCCESS_PLACEHOLDER", payload: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

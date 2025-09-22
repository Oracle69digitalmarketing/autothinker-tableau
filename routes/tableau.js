const express = require("express");
const router = express.Router();
const { fetchDataCloud, createDashboard, embedDashboard } = require("../utils/tableauClient");

// Fetch sample data from Data Cloud API
router.get("/fetch-data", async (req, res) => {
  try {
    const data = await fetchDataCloud(); // placeholder function
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create a Tableau dashboard (placeholder)
router.post("/create-dashboard", async (req, res) => {
  try {
    const dashboardId = await createDashboard(req.body); // placeholder
    res.json({ success: true, dashboardId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Embed a Tableau dashboard in frontend
router.get("/embed/:dashboardId", async (req, res) => {
  try {
    const embedUrl = await embedDashboard(req.params.dashboardId); // placeholder
    res.json({ success: true, embedUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

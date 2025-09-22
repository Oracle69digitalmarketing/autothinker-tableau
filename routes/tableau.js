const express = require("express");
const router = express.Router();
const {
  fetchTableauData,
  fetchDataCloud,
  createDashboard,
  embedDashboard
} = require("../utils/tableauClient"); // update path if needed

// Fetch Tableau views
router.get("/views", async (req, res) => {
  try {
    const idea = req.query.idea || "";
    const views = await fetchTableauData(idea);
    res.json({ views });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder: Fetch Data Cloud objects
router.get("/data-cloud", async (req, res) => {
  try {
    const data = await fetchDataCloud();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder: Create dashboard
router.post("/dashboard", async (req, res) => {
  try {
    const dashboardId = await createDashboard(req.body);
    res.json({ dashboardId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder: Embed dashboard
router.get("/embed/:dashboardId", async (req, res) => {
  try {
    const url = await embedDashboard(req.params.dashboardId);
    res.json({ embedUrl: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  fetchTableauDataForIdea,
  fetchDataCloud,
  createDashboard,
  embedDashboard,
} = require("../utils/tableauClient"); // adjust path if needed

/**
 * GET /api/tableau/views
 * Fetch Tableau views for a given idea
 * Query param: idea
 */
router.get("/views", async (req, res) => {
  try {
    const idea = req.query.idea || "";
    const views = await fetchTableauDataForIdea(idea);
    res.json({ views });
  } catch (err) {
    console.error("[Tableau Route] GET /views error:", err.message);
    res.status(500).json({ error: "Failed to fetch Tableau views", details: err.message });
  }
});

/**
 * GET /api/tableau/data-cloud
 * Fetch Data Cloud placeholder objects
 */
router.get("/data-cloud", async (req, res) => {
  try {
    const data = await fetchDataCloud();
    res.json({ data });
  } catch (err) {
    console.error("[Tableau Route] GET /data-cloud error:", err.message);
    res.status(500).json({ error: "Failed to fetch Data Cloud data", details: err.message });
  }
});

/**
 * POST /api/tableau/dashboard
 * Placeholder: Create a dashboard
 */
router.post("/dashboard", async (req, res) => {
  try {
    const dashboardId = await createDashboard(req.body);
    res.json({ dashboardId });
  } catch (err) {
    console.error("[Tableau Route] POST /dashboard error:", err.message);
    res.status(500).json({ error: "Failed to create dashboard", details: err.message });
  }
});

/**
 * GET /api/tableau/embed/:dashboardId
 * Placeholder: Embed a dashboard
 */
router.get("/embed/:dashboardId", async (req, res) => {
  try {
    const url = await embedDashboard(req.params.dashboardId);
    res.json({ embedUrl: url });
  } catch (err) {
    console.error("[Tableau Route] GET /embed/:dashboardId error:", err.message);
    res.status(500).json({ error: "Failed to embed dashboard", details: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { fetchSalesforceData } = require("../utils/salesforceClient");

router.get("/fetch/:object", async (req, res) => {
  try {
    const data = await fetchSalesforceData(req.params.object);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

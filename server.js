const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Import routes
const aiRoutes = require("./routes/ai");
const tableauRoutes = require("./routes/tableau");
const salesforceRoutes = require("./routes/salesforce");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/ai", aiRoutes);
app.use("/api/tableau", tableauRoutes);
app.use("/api/salesforce", salesforceRoutes);

// Frontend entry
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "autothinkerWDC.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Global Error]:", err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

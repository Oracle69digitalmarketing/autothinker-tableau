const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const aiRoutes = require("./routes/ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/ai", aiRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "autothinkerWDC.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

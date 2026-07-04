require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/email", require("./routes/email"));

app.use("/api/jd", require("./routes/jd"));
app.use("/api/resume", require("./routes/resume"));
app.use("/api/assess", require("./routes/assess"));
app.use("/api/feedback", require("./routes/feedback"));

app.get("/", (req, res) => res.json({ status: "FairHire AI Backend Running ✅" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 FairHire backend running on port ${PORT}`));
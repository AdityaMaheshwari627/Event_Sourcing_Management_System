const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const replayRoutes = require("./routes/replayRoutes");
const snapshotRoutes = require("./routes/snapshotRoutes");

const logger = require("./middleware/loggerMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// ==========================
// Global Middleware
// ==========================

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  },
}));
app.use(express.json());
app.use(logger);

// ==========================
// Routes
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/replay", replayRoutes);
app.use("/api/snapshot", snapshotRoutes);
app.get("/api/health", (req, res) => res.status(200).json({ success: true }));

// ==========================
// Error Handler
// ==========================

app.use(errorHandler);

module.exports = app;

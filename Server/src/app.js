const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const replayRoutes = require("./routes/replayRoutes");
const snapshotRoutes = require("./routes/snapshotRoutes");

const logger = require("./middleware/loggerMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// ==========================
// Global Middleware
// ==========================

app.use(cors());
app.use(express.json());
app.use(logger);

// ==========================
// Routes
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/replay", replayRoutes);
app.use("/api/snapshot", snapshotRoutes);

// ==========================
// Error Handler
// ==========================

app.use(errorHandler);

module.exports = app;
const express = require("express");
const cors = require("cors");

const app = express();

// ==============================
// Middlewares
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Test Route
// ==============================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Event Source Task Management API Running Successfully"
    });
});

module.exports = app;
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSnapshot,
  getLatestSnapshot,
} = require("../controllers/snapshotController");

// ======================================
// Snapshot Routes
// ======================================

// Create Snapshot
router.post(
  "/create",
  protect,
  createSnapshot
);

// Get Latest Snapshot
router.get(
  "/:accountId",
  protect,
  getLatestSnapshot
);

module.exports = router;
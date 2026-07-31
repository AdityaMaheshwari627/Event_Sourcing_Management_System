const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  replayAccount,
} = require("../controllers/replayController");

// ======================================
// Replay Account State
// ======================================

router.get(
  "/:accountId",
  protect,
  replayAccount
);

module.exports = router;
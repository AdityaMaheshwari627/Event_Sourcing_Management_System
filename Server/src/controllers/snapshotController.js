const snapshotService = require("../services/snapshotService");

// ======================================
// Create Snapshot
// ======================================
const createSnapshot = async (req, res) => {
  try {

    const { accountId } = req.body;

    const snapshot = await snapshotService.createSnapshot(
      accountId
    );

    return res.status(201).json({
      success: true,
      message: "Snapshot Created Successfully",
      snapshot,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get Latest Snapshot
// ======================================
const getLatestSnapshot = async (req, res) => {
  try {

    const { accountId } = req.params;

    const snapshot = await snapshotService.getLatestSnapshot(
      accountId
    );

    return res.status(200).json({
      success: true,
      snapshot,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createSnapshot,
  getLatestSnapshot,
};
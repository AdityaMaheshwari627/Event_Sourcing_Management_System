const snapshotService = require("../services/snapshotService");
const accountService = require("../services/accountService");

// ======================================
// Create Snapshot
// ======================================
const createSnapshot = async (req, res) => {
  try {

    const { accountId } = req.body;

    await accountService.getAccountById(accountId, req.user.id);

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

    await accountService.getAccountById(accountId, req.user.id);

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

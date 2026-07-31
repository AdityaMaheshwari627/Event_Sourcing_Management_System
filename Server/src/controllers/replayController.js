const replayService = require("../services/replayService");

// ======================================
// Replay Account State
// ======================================
const replayAccount = async (req, res) => {
  try {

    const { accountId } = req.params;

    const accountState = await replayService.replayAccount(accountId);

    return res.status(200).json({
      success: true,
      message: "Account State Reconstructed Successfully",
      data: accountState,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  replayAccount,
};
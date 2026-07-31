const Account = require("../models/Account");

const checkAccountOwnership = async (req, res, next) => {
  try {

    const accountId =
      req.body.accountId ||
      req.body.senderId ||
      req.params.accountId;

    if (!accountId) {
      return res.status(400).json({
        success: false,
        message: "Account ID is required",
      });
    }

    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account Not Found",
      });
    }

    if (account.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    req.account = account;

    next();

  } catch (error) {

    next(error);

  }
};

module.exports = checkAccountOwnership;
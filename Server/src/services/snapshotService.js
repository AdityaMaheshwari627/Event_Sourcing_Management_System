const Snapshot = require("../models/Snapshot");
const Account = require("../models/Account");
const Event = require("../models/Event");

// ======================================
// Create Snapshot
// ======================================
const createSnapshot = async (accountId) => {

  const account = await Account.findById(accountId);

  if (!account) {
    throw new Error("Account Not Found");
  }

  const latestEvent = await Event.findOne({
    aggregateId: accountId,
  }).sort({ version: -1 });

  if (!latestEvent) {
    throw new Error("No Events Found");
  }

  const snapshot = await Snapshot.create({
    aggregateId: account._id,
    aggregateType: "Account",
    version: latestEvent.version,
    state: {
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      balance: account.balance,
      status: account.status,
    },
  });

  return snapshot;
};

// ======================================
// Get Latest Snapshot
// ======================================
const getLatestSnapshot = async (accountId) => {

  const snapshot = await Snapshot.findOne({
    aggregateId: accountId,
  }).sort({ version: -1 });

  return snapshot;
};

module.exports = {
  createSnapshot,
  getLatestSnapshot,
};
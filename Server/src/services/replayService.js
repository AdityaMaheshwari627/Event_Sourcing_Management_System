const Event = require("../models/Event");
const Snapshot = require("../models/Snapshot");
const EVENT_TYPES = require("../constants/eventTypes");

// ======================================
// Replay Account State
// ======================================

const replayAccount = async (accountId) => {
  // Latest Snapshot
  const snapshot = await Snapshot.findOne({
    aggregateId: accountId,
  }).sort({ version: -1 });

  let state = {
    accountId,
    accountNumber: "",
    accountType: "",
    balance: 0,
    status: "Active",
  };

  let startVersion = 1;

  // Restore Snapshot
  if (snapshot) {
    state = {
      accountId,
      ...snapshot.state,
    };

    startVersion = snapshot.version + 1;
  }

  // Replay Remaining Events
  const events = await Event.find({
    aggregateId: accountId,
    version: {
      $gte: startVersion,
    },
  }).sort({ version: 1 });

  if (!snapshot && events.length === 0) {
    throw new Error("No Events Found");
  }

  for (const event of events) {
    switch (event.eventType) {
      case EVENT_TYPES.ACCOUNT_CREATED:
        state.accountNumber = event.payload.accountNumber;
        state.accountType = event.payload.accountType;
        state.balance = Number(event.payload.balance);
        state.status = "Active";
        break;

      case EVENT_TYPES.MONEY_DEPOSITED:
        state.balance += Number(event.payload.amount);
        break;

      case EVENT_TYPES.MONEY_WITHDRAWN:
        state.balance -= Number(event.payload.amount);
        break;

      case EVENT_TYPES.TRANSFER_SENT:
        state.balance -= Number(event.payload.amount);
        break;

      case EVENT_TYPES.TRANSFER_RECEIVED:
        state.balance += Number(event.payload.amount);
        break;

      default:
        console.warn(`Unknown Event Type: ${event.eventType}`);
        break;
    }
  }

  return state;
};

module.exports = {
  replayAccount,
};
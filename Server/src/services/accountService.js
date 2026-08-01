const mongoose = require("mongoose");
const Account = require("../models/Account");
const Event = require("../models/Event");
const EVENT_TYPES = require("../constants/eventTypes");

// ======================================
// Get Next Event Version
// ======================================

const getNextVersion = async (aggregateId, session) => {
  const lastEvent = await Event.findOne({ aggregateId })
    .sort({ version: -1 })
    .session(session);

  return lastEvent ? lastEvent.version + 1 : 1;
};

// ======================================
// Get All Accounts
// ======================================

const getAccounts = async (userId) => {
  return await Account.find({ user: userId }).sort({
    createdAt: -1,
  });
};

// ======================================
// Get Single Account
// ======================================

const getAccountById = async (accountId, userId) => {
  const account = await Account.findOne({
    _id: accountId,
    user: userId,
  });

  if (!account) {
    throw new Error("Account Not Found");
  }

  return account;
};

// ======================================
// Create Account
// ======================================

const createAccount = async (userId, accountType = "Saving") => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const accountNumber = "ACC" + Date.now();

    const account = await Account.create(
      [
        {
          accountNumber,
          user: userId,
          accountType,
          balance: 0,
          status: "Active",
        },
      ],
      { session }
    );

    await Event.create(
      [
        {
          aggregateId: account[0]._id,
          aggregateType: "Account",
          eventType: EVENT_TYPES.ACCOUNT_CREATED,
          payload: {
            accountNumber,
            accountType,
            balance: 0,
            userId,
          },
          version: 1,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return account[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// ======================================
// Deposit
// ======================================

const depositMoney = async (accountId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    amount = Number(amount);

    if (amount <= 0) {
      throw new Error("Invalid Amount");
    }

    const account = await Account.findById(accountId).session(session);

    if (!account) {
      throw new Error("Account Not Found");
    }

    account.balance += amount;

    await account.save({ session });

    const version = await getNextVersion(account._id, session);

    await Event.create(
      [
        {
          aggregateId: account._id,
          aggregateType: "Account",
          eventType: EVENT_TYPES.MONEY_DEPOSITED,
          payload: {
            amount,
            newBalance: account.balance,
          },
          version,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return account;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// ======================================
// Withdraw
// ======================================

const withdrawMoney = async (accountId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    amount = Number(amount);

    if (amount <= 0) {
      throw new Error("Invalid Amount");
    }

    const account = await Account.findById(accountId).session(session);

    if (!account) {
      throw new Error("Account Not Found");
    }

    if (account.balance < amount) {
      throw new Error("Insufficient Balance");
    }

    account.balance -= amount;

    await account.save({ session });

    const version = await getNextVersion(account._id, session);

    await Event.create(
      [
        {
          aggregateId: account._id,
          aggregateType: "Account",
          eventType: EVENT_TYPES.MONEY_WITHDRAWN,
          payload: {
            amount,
            newBalance: account.balance,
          },
          version,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return account;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
// ======================================
// Transfer Money
// ======================================

const transferMoney = async (senderId, receiverId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    amount = Number(amount);

    if (amount <= 0) {
      throw new Error("Invalid Amount");
    }

    const sender = await Account.findById(senderId).session(session);
    const receiver = await Account.findById(receiverId).session(session);

    if (!sender) {
      throw new Error("Sender Account Not Found");
    }

    if (!receiver) {
      throw new Error("Receiver Account Not Found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient Balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    const senderVersion = await getNextVersion(sender._id, session);

    await Event.create(
      [
        {
          aggregateId: sender._id,
          aggregateType: "Account",
          eventType: EVENT_TYPES.TRANSFER_SENT,
          payload: {
            receiverId: receiver._id,
            amount,
            newBalance: sender.balance,
          },
          version: senderVersion,
        },
      ],
      { session }
    );

    const receiverVersion = await getNextVersion(
      receiver._id,
      session
    );

    await Event.create(
      [
        {
          aggregateId: receiver._id,
          aggregateType: "Account",
          eventType: EVENT_TYPES.TRANSFER_RECEIVED,
          payload: {
            senderId: sender._id,
            amount,
            newBalance: receiver.balance,
          },
          version: receiverVersion,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      message: "Transfer Successful",
      sender,
      receiver,
    };

  } catch (error) {

    await session.abortTransaction();
    throw error;

  } finally {

    session.endSession();

  }
};

// ======================================
// Exports
// ======================================

module.exports = {
  createAccount,
  depositMoney,
  withdrawMoney,
  transferMoney,
  getAccounts,
  getAccountById,
};
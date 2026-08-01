const asyncHandler = require("../middleware/asyncHandler");
const accountService = require("../services/accountService");
const Event = require("../models/Event");

// ======================================
// Create Account
// ======================================

const createAccount = asyncHandler(async (req, res) => {
  const { accountType } = req.body;

  const account = await accountService.createAccount(
    req.user.id,
    accountType
  );

  res.status(201).json({
    success: true,
    message: "Account Created Successfully",
    account,
  });
});

// ======================================
// Get All Accounts
// ======================================

const getAccounts = asyncHandler(async (req, res) => {

  const accounts = await accountService.getAccounts(
    req.user.id
  );

  res.status(200).json({
    success: true,
    accounts,
  });

});

// ======================================
// Get Single Account
// ======================================

const getAccountById = asyncHandler(async (req, res) => {

  const account =
    await accountService.getAccountById(
      req.params.id,
      req.user.id
    );

  res.status(200).json({
    success: true,
    account,
  });

});

const getAccountEvents = asyncHandler(async (req, res) => {
  await accountService.getAccountById(req.params.id, req.user.id);

  const events = await Event.find({ aggregateId: req.params.id })
    .sort({ version: -1, createdAt: -1 });

  res.status(200).json({ success: true, events });
});

const getUserEvents = asyncHandler(async (req, res) => {
  const accounts = await accountService.getAccounts(req.user.id);
  const events = await Event.find({
    aggregateId: { $in: accounts.map((account) => account._id) },
  }).sort({ createdAt: -1 });

  res.status(200).json({ success: true, events });
});

// ======================================
// Deposit Money
// ======================================

const depositMoney = asyncHandler(async (req, res) => {
  const { accountId, amount } = req.body;

  const account = await accountService.depositMoney(
    accountId,
    amount
  );

  res.status(200).json({
    success: true,
    message: "Money Deposited Successfully",
    account,
  });
});

// ======================================
// Withdraw Money
// ======================================

const withdrawMoney = asyncHandler(async (req, res) => {
  const { accountId, amount } = req.body;

  const account = await accountService.withdrawMoney(
    accountId,
    amount
  );

  res.status(200).json({
    success: true,
    message: "Money Withdrawn Successfully",
    account,
  });
});

// ======================================
// Transfer Money
// ======================================

const transferMoney = asyncHandler(async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  const result = await accountService.transferMoney(
    senderId,
    receiverId,
    amount
  );

  res.status(200).json({
    success: true,
    message: "Money Transferred Successfully",
    sender: result.sender,
    receiver: result.receiver,
  });
});

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  getAccountEvents,
  getUserEvents,
  depositMoney,
  withdrawMoney,
  transferMoney,
};

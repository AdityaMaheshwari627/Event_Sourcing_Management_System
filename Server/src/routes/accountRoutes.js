const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const checkAccountOwnership = require("../middleware/ownershipMiddleware");

const {
  createAccount,
  getAccounts,
  getAccountById,
  getAccountEvents,
  getUserEvents,
  depositMoney,
  withdrawMoney,
  transferMoney,
} = require("../controllers/accountController");

// ======================================
// Get All Accounts
// ======================================

router.get(
  "/",
  protect,
  getAccounts
);

// ======================================
// Get Single Account
// ======================================

router.get("/events", protect, getUserEvents);

router.get(
  "/:id",
  protect,
  getAccountById
);

router.get(
  "/:id/events",
  protect,
  getAccountEvents
);

// ======================================
// Create Account
// ======================================

router.post(
  "/create",
  protect,
  body("accountType")
    .isIn(["Saving", "Current"])
    .withMessage("Account Type must be Saving or Current"),
  validate,
  createAccount
);

// ======================================
// Deposit Money
// ======================================

router.post(
  "/deposit",
  protect,
  checkAccountOwnership,
  body("accountId").notEmpty(),
  body("amount").isFloat({ gt: 0 }),
  validate,
  depositMoney
);

// ======================================
// Withdraw Money
// ======================================

router.post(
  "/withdraw",
  protect,
  checkAccountOwnership,
  body("accountId").notEmpty(),
  body("amount").isFloat({ gt: 0 }),
  validate,
  withdrawMoney
);

// ======================================
// Transfer Money
// ======================================

router.post(
  "/transfer",
  protect,
  checkAccountOwnership,
  body("senderId").notEmpty(),
  body("receiverId").notEmpty(),
  body("amount").isFloat({ gt: 0 }),
  validate,
  transferMoney
);

module.exports = router;

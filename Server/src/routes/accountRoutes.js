const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const checkAccountOwnership = require("../middleware/ownershipMiddleware");

const {
  createAccount,
  depositMoney,
  withdrawMoney,
  transferMoney,
} = require("../controllers/accountController");

// =========================
// Create Account
// =========================

router.post(
  "/create",
  protect,
  body("accountType")
    .isIn(["Saving", "Current"])
    .withMessage("Account Type must be Saving or Current"),
  validate,
  createAccount
);

// =========================
// Deposit
// =========================

router.post(
  "/deposit",
  protect,
  checkAccountOwnership,
  body("accountId").notEmpty(),
  body("amount").isFloat({ gt: 0 }),
  validate,
  depositMoney
);

// =========================
// Withdraw
// =========================

router.post(
  "/withdraw",
  protect,
  checkAccountOwnership,
  body("accountId").notEmpty(),
  body("amount").isFloat({ gt: 0 }),
  validate,
  withdrawMoney
);

// =========================
// Transfer
// =========================

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
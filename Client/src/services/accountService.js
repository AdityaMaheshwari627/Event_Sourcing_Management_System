import api from "./api";

// =========================
// Get All Accounts
// =========================
export const getAccounts = async () => {
  const { data } = await api.get("/accounts");

  return data;
};

// =========================
// Create Account
// =========================
export const createAccount = async (accountType) => {
  const { data } = await api.post("/accounts/create", {
    accountType,
  });

  return data;
};

// =========================
// Deposit Money
// =========================
export const depositMoney = async (payload) => {
  const { data } = await api.post("/accounts/deposit", payload);

  return data;
};

// =========================
// Withdraw Money
// =========================
export const withdrawMoney = async (payload) => {
  const { data } = await api.post("/accounts/withdraw", payload);

  return data;
};

// =========================
// Transfer Money
// =========================
export const transferMoney = async (payload) => {
  const { data } = await api.post("/accounts/transfer", payload);

  return data;
};
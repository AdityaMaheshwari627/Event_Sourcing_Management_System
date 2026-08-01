import api from "./api";

// =========================
// Get All Accounts
// =========================
export const getAccounts = async () => {
  const { data } = await api.get("/account");

  return data;
};

// =========================
// Create Account
// =========================
export const createAccount = async (accountType) => {
  const { data } = await api.post("/account/create", { accountType });

  return data;
};

// =========================
// Deposit Money
// =========================
export const depositMoney = async (payload) => {
  const { data } = await api.post("/account/deposit", payload);

  return data;
};

// =========================
// Withdraw Money
// =========================
export const withdrawMoney = async (payload) => {
  const { data } = await api.post("/account/withdraw", payload);

  return data;
};

// =========================
// Transfer Money
// =========================
export const transferMoney = async (payload) => {
  const { data } = await api.post("/account/transfer", payload);

  return data;
};

export const getEvents = async () => {
  const { data } = await api.get("/account/events");
  return data;
};

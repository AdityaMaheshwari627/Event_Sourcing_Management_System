import API from "./api";

export const depositMoney = (data) =>
  API.post("/transactions/deposit", data);

export const withdrawMoney = (data) =>
  API.post("/transactions/withdraw", data);

export const transferMoney = (data) =>
  API.post("/transactions/transfer", data);

export const getPassbook = (id) =>
  API.get(`/transactions/passbook/${id}`);
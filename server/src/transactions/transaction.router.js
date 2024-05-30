const express = require("express");
const transactionController = require("./transaction.controller");
const transactionRouter = express.Router();

transactionRouter.get(
  "/api/transactions",
  transactionController.getAllTransaction
);
transactionRouter.get(
  "/api/transaction/:id",
  transactionController.getTransactionById
);

transactionRouter.put(
  "/api/transaction/:id/paidoff",
  transactionController.markTransactionAsPaidOff
);

transactionRouter.post(
  "/api/transaction",
  transactionController.addTransaction
);

module.exports = {
  transactionRouter,
};

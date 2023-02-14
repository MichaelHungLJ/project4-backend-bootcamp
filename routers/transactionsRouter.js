const express = require("express");
const router = express.Router();

class TransactionsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/getAllTransactionByUser",
      this.controller.getAllTransactionsByUser.bind(this.controller)
    );

    router.get(
      "/getAllTransactionByWallet",
      this.controller.getAllTransactionByWallet.bind(this.controller)
    );

    router.post(
      "/addTransaction",
      this.controller.addTransaction.bind(this.controller)
    );

    return router;
  }
}

module.exports = TransactionsRouter;

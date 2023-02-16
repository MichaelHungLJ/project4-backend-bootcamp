const express = require("express");
const router = express.Router();

class TransactionsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/getAllTransactions",
      this.controller.getAllTransactions.bind(this.controller)
    );

    router.get(
      "/getWalletTransactions",
      this.controller.getWalletTransactions.bind(this.controller)
    );

    router.post(
      "/addTransaction",
      this.controller.addTransaction.bind(this.controller)
    );

    return router;
  }
}

module.exports = TransactionsRouter;

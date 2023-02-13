const express = require("express");
const router = express.Router();

class TransactionsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    router.post(
      "/addTransaction",
      this.controller.addTransaction.bind(this.controller)
    );

    return router;
  }
}

module.exports = TransactionsRouter;

const express = require("express");
const router = express.Router();

class CoinlistRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // http://localhost:3000/coinlist
    // router.get("/", this.controller.test.bind(this.controller));

    router.get("/", this.controller.testCoinList.bind(this.controller));

    router.post("/", this.controller.updateCoinList.bind(this.controller));

    return router;
  }
}

module.exports = CoinlistRouter;

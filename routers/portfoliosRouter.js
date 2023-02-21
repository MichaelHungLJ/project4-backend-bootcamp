const express = require("express");
const router = express.Router();

class PortfolioRouter {
  constructor(controller) {
    this.controller = controller;
  }

  // Get request need to change on how to query username via authentication

  routes() {
    router.get(
      "/getPortfolioGrowth",
      this.controller.getPortfolioGrowth.bind(this.controller)
    );

    router.post(
      "/updatePortfolio",
      this.controller.updatePortfolio.bind(this.controller)
    );

    return router;
  }
}

module.exports = PortfolioRouter;

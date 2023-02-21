const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  // Get request need to change on how to query username via authentication

  routes() {
    router.get(
      "/getAllWallets",
      this.controller.getAllWallets.bind(this.controller)
    );

    router.get(
      "/getWalletId",
      this.controller.getWalletId.bind(this.controller)
    );

    // // Add wallet
    router.post("/addWallet", this.controller.addWallet.bind(this.controller));

    // // Update Wallet
    router.put(
      "/updateWallet",
      this.controller.updateWallet.bind(this.controller)
    );

    // // Delete
    router.delete(
      "/deleteWallet",
      this.controller.deleteWallet.bind(this.controller)
    );

    router.get(
      "/getWalletData",
      this.controller.getWalletData.bind(this.controller)
    );

    router.get(
      "/getPortfolio",
      this.controller.getPortfolio.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;

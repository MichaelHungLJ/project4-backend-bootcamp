const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  // Get request need to change on how to query username via authentication

  routes() {
    // http://localhost:3000/wallets/
    router.get(
      "/getAllWallets/:name",
      this.controller.getAllWallets.bind(this.controller)
    );

    router.get(
      "/getWalletId/:address",
      this.controller.getWalletId.bind(this.controller)
    );

    // Get wallet ID by wallet name
    router.get(
      "/getWalletIdByName",
      this.controller.getWalletIdByName.bind(this.controller)
    );

    // // Create wallet
    router.post("/addWallet", this.controller.addWallet.bind(this.controller));

    // // Update Wallet
    router.put(
      "/updateWallet",
      this.controller.updateWallet.bind(this.controller)
    );

    // // Delete (WIP)
    router.delete(
      "/deleteWallet",
      this.controller.deleteWallet.bind(this.controller)
    );

    return router;
  }
}

module.exports = UsersRouter;

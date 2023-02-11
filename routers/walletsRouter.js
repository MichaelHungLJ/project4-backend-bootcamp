const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // Read
    router.get("/", this.controller.getWallet.bind(this.controller));

    // // Create
    router.post("/", this.controller.addWallet.bind(this.controller));

    // // Update
    // router.put("/", this.controller.updateWallet.bind(this.controller));

    // // Delete
    // router.delete("/", this.controller.deleteWallet.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;

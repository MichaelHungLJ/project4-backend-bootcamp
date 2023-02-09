const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.test.bind(this.controller));

    router.post("/", this.controller.createUser.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;

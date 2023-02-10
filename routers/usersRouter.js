const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // http://localhost:3000/users/signup
    router.post("/signup", this.controller.createUser.bind(this.controller));
    router.post("/login", this.controller.loginUser.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;

const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    // http://localhost:3000/users/signup
    router.get(
      "/test",
      this.auth,
      this.controller.currentUser.bind(this.controller)
    );

    //
    router.get("/getUserId", this.controller.getUserId.bind(this.controller));

    router.post("/signup", this.controller.createUser.bind(this.controller));
    router.post("/login", this.controller.loginUser.bind(this.controller));

    router.get("/validate", this.controller.currentUser.bind(this.controller));

    router.get(
      "/getAllUserId",
      this.controller.getAllUserId.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;

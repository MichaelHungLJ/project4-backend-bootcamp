const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // POST request
  async getWallet(req, res) {
    return res.send("hello");
  }
}

module.exports = UsersController;

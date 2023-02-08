const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // POST request
  async createUser(req, res) {
    // name email password

    return res.send("hello");
  }
}

module.exports = UsersController;

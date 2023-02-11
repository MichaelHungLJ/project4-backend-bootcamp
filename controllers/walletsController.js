const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // POST request
  async getWallet(req, res) {
    return res.send("hello");
  }

  async addWallet(req, res) {
    const { name, address, type } = req.body;

    return;
  }
}

module.exports = UsersController;

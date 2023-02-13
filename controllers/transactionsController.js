const BaseController = require("./baseController");

class TransactionsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async addTransaction(req, res) {
    try {
      return res.send("Hello");
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }
}

module.exports = TransactionsController;

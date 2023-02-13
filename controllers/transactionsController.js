const BaseController = require("./baseController");

class TransactionsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // POST
  // Input: user_id, wallet_id, wallet (name), date, type, coin, quantity, price
  async addTransaction(req, res) {
    const { wallet, date, type, coin, quantity, price } = req.body;

    try {
      // const payload = {
      //   user_id: "1",
      //   wallet_id: "",
      // };

      return res.send("Hello");
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }
}

module.exports = TransactionsController;

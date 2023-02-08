const BaseController = require("./baseController");

class CoinlistController extends BaseController {
  constructor(model) {
    super(model);
  }

  async testCoinList(req, res) {
    return res.send("CoinList Controller Works!");
  }
}

module.exports = CoinlistController;

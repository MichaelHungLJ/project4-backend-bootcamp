const BaseController = require("./baseController");

class CoinlistController extends BaseController {
  constructor(model) {
    super(model);
  }

  async testCoinList(req, res) {
    return res.send("CoinList Controller Works!");
  }

  async updateCoinList(req, res) {
    try {
      const { id, symbol, name } = req.body;

      const payload = {
        coin_id: id,
        symbol: symbol,
        name: name,
      };

      console.log("Payload here: ", payload);
      const data = await this.model.create(payload);
      return res.json("Data!");
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err });
    }
  }
}

module.exports = CoinlistController;

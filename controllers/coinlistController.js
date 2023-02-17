const BaseController = require("./baseController");

class CoinlistController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getCoinId(req, res) {
    const { coin } = req.query;

    try {
      const symbol = coin.toLowerCase();
      console.log("Is this lower case?", symbol);

      const response = await this.model.findOne({ where: { symbol: symbol } });

      console.log(response);

      return res.status(200).res.json({ success: true, data: response });
    } catch (error) {
      return res.status(400).json({ success: false, message: `Error` });
    }
  }

  async updateCoinList(req, res) {
    try {
      // data will be in an array
      const data = req.body;

      const payload = {
        coin_id: id,
        symbol: symbol,
        name: name,
      };

      console.log("Payload here: ", payload);
      // const data = await this.model.create(payload);
      return res.json("Data!");
    } catch (err) {
      return res.status(400).send({ err });
    }
  }
}

module.exports = CoinlistController;

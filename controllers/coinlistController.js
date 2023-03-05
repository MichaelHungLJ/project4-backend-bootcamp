const BaseController = require("./baseController");

class CoinlistController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getCoinId(req, res) {
    const { coin } = req.query;

    try {
      const symbol = coin.toLowerCase();

      const response = await this.model.findOne({ where: { symbol: symbol } });
      if (response === null) {
        return res
          .status(200)
          .json({ success: false, message: "Coin not supported" });
      } else {
        return res
          .status(200)
          .json({ success: true, data: response.dataValues });
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: `Bad request` });
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

const BaseController = require("./baseController");
const axios = require("axios");
const constant = require("../constant");

class TransactionsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // GET REQUEST
  // Get all transaction that belongs to the user
  // Input query params: {email : email}
  async getAllTransactions(req, res) {
    const { user_id } = req.query;
    try {
      const data = await this.model.findAll({ where: { userId: user_id } });

      console.log("DATA IS: ", data);
      return res.status(200).json({ success: true, data: data });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }
  }

  // Get all transactions related to the wallet
  async getWalletTransactions(req, res) {
    const { user_id, wallet_id } = req.query;

    try {
      const data = await this.model.findAll({
        where: { userId: user_id, walletId: wallet_id },
      });
      return res.status(200).json({ success: true, data: data });
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }

  // POST
  async addTransaction(req, res) {
    const { user_id, wallet_id, wallet, date, type, coin, quantity, price } =
      req.body;
    console.log(date);
    console.log(req.body);
    //Assuming date is passed in as string from Front End (yyyy/mm/dd)
    const dateParts = date.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const dateObject = new Date(year, month, day);

    try {
      const payload = {
        userId: user_id,
        walletId: wallet_id,
        wallet: wallet,
        date: dateObject,
        type: type,
        coin: coin,
        quantity: quantity,
        price: price,
      };

      const data = await this.model.create(payload);
      return res
        .status(200)
        .json({ success: true, data: data, message: "Transaction Added!" });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }
}

module.exports = TransactionsController;

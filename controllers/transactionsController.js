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
  async getAllTransactionsByUser(req, res) {
    try {
      // get user id
      const response = await axios.get(constant.url.GET_USER_ID, {
        params: req.query,
      });
      const user_id = response.data.id;

      const data = await this.model.findAll({ where: { userId: user_id } });

      console.log("DATA IS: ", data);
      return res.status(200).json({ success: true, message: "Success!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: "Error" });
    }
  }

  // Get all transactions related to the wallet
  async getAllTransactionByWallet(req, res) {}

  // POST
  // Input: email, wallet (name), date, type, coin, quantity, price
  async addTransaction(req, res) {
    const { email, wallet, date, type, coin, quantity, price } = req.body;

    //Assuming date is passed in as string from Front End (yyyy/mm/dd)
    const dateParts = date.split("/");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const dateObject = new Date(year, month, day);

    try {
      // get user_id by email
      const response1 = await axios.get(constant.url.GET_USER_ID, {
        params: { email: email },
      });
      const user_id = response1.data.id;

      // get wallet_id by wallet Name
      const response2 = await axios.get(
        constant.url.GET_WALLET_ID_BY_WALLET_NAME,
        {
          params: { name: wallet },
        }
      );

      const wallet_id = response2;
      console.log("wallet_id: ", wallet_id);

      // construct payload and create in model
      const payload = {
        user_id: user_id,
        wallet_id: wallet_id,
        wallet: wallet,
        date: dateObject,
        type: type,
        coin: coin,
        quantity: quantity,
        price: price,
      };

      const data = await this.model.create(payload);

      console.log(data);

      return res
        .status(200)
        .json({ success: true, data: data, message: "Transaction Added!" });
    } catch (err) {
      console.log(err);
      return res.status(403).json({ success: false, error: err });
    }
  }
}

module.exports = TransactionsController;

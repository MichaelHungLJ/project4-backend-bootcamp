const BaseController = require("./baseController");
const axios = require("axios");
const constant = require("../constant");
const checkWalletHoldings = require("../helpers/checkWalletHoldings");
const combineWallets = require("../helpers/combineWallets");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // GET request
  // Input query: { user_id }
  async getAllWallets(req, res) {
    const { user_id } = req.query;
    try {
      const data = await this.model.findAll({
        where: { userId: user_id },
      });

      return res.status(200).json({ success: true, wallets: data });
    } catch (err) {
      console.log("Error: ", err);
      return res.status(403).json({ success: false, error: err });
    }
  }

  // GET request
  // Input query: {user_id: user_id, address: address}
  async getWalletId(req, res) {
    const { user_id, address } = req.query;
    try {
      const response = await this.model.findOne({
        where: { user_id: user_id, address: address },
      });
      console.log(response);
      return res
        .status(200)
        .json({ success: true, walletId: response.dataValues.id });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async addWallet(req, res) {
    const { name, address, type, user_id } = req.body;

    try {
      const payload = {
        name: name,
        address: address,
        type: type,
        userId: user_id,
      };
      const data = await this.model.create(payload);

      return res
        .status(200)
        .json({ success: true, message: "Wallet added!", wallet: data });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async updateWallet(req, res) {
    const { name, address, type, user_id } = req.body;
    try {
      const data = await this.model.update(
        { name: name, type: type },
        {
          where: {
            address: address,
            userId: user_id,
          },
        }
      );

      return res
        .status(200)
        .json({ success: true, message: "Wallet updated!" });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async deleteWallet(req, res) {
    const { user_id, address } = req.body;

    try {
      const data = await this.model.destroy({
        where: {
          userId: user_id,
          address: address,
        },
      });
      return res
        .status(200)
        .json({ success: true, message: "Wallet deleted!" });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  /// DATA ANALYTICS ///
  // GET request, query: wallet_id, user_id
  async getWalletData(req, res) {
    const { user_id, wallet_id } = req.query;
    try {
      // Get all transactions related to wallet
      const response = await axios.get(constant.transactions.GET_WALLET_TXNS, {
        params: { user_id: user_id, wallet_id: wallet_id },
      });
      const txndata = response.data.data;

      // const txndata = [
      //   {
      //     id: 21,
      //     userId: 5,
      //     walletId: 6,
      //     wallet: "Banana",
      //     date: "2023-02-01T16:00:00.000Z",
      //     type: "Deposit",
      //     coin: "USD",
      //     quantity: "34000",
      //     price: "1",
      //     createdAt: "2023-02-22T08:03:07.032Z",
      //     updatedAt: "2023-02-22T08:03:07.032Z",
      //   },
      //   {
      //     id: 22,
      //     userId: 5,
      //     walletId: 6,
      //     wallet: "Banana",
      //     date: "2023-02-02T16:00:00.000Z",
      //     type: "Buy",
      //     coin: "ETH",
      //     quantity: "5",
      //     price: "1500",
      //     createdAt: "2023-02-22T08:03:41.402Z",
      //     updatedAt: "2023-02-22T08:03:41.402Z",
      //   },
      //   {
      //     id: 23,
      //     userId: 5,
      //     walletId: 6,
      //     wallet: "Banana",
      //     date: "2023-02-06T16:00:00.000Z",
      //     type: "Sell",
      //     coin: "ETH",
      //     quantity: "2",
      //     price: "3000",
      //     createdAt: "2023-02-22T08:04:13.169Z",
      //     updatedAt: "2023-02-22T08:04:13.169Z",
      //   },
      //   {
      //     id: 24,
      //     userId: 5,
      //     walletId: 6,
      //     wallet: "Banana",
      //     date: "2023-02-10T16:00:00.000Z",
      //     type: "Buy",
      //     coin: "ETH",
      //     quantity: "1.5",
      //     price: "2000",
      //     createdAt: "2023-02-22T08:04:29.114Z",
      //     updatedAt: "2023-02-22T08:04:29.114Z",
      //   },
      //   {
      //     id: 27,
      //     userId: 5,
      //     walletId: 6,
      //     wallet: "Banana",
      //     date: "2023-02-02T16:00:00.000Z",
      //     type: "Deposit",
      //     coin: "USD",
      //     quantity: "100",
      //     price: "1",
      //     createdAt: "2023-02-22T10:18:08.211Z",
      //     updatedAt: "2023-02-22T10:18:08.211Z",
      //   },
      //   {
      //     id: 28,
      //     userId: 5,
      //     walletId: 6,
      //     wallet: "Banana",
      //     date: "2023-02-21T16:00:00.000Z",
      //     type: "Deposit",
      //     coin: "USD",
      //     quantity: "100",
      //     price: "1",
      //     createdAt: "2023-02-22T10:23:36.641Z",
      //     updatedAt: "2023-02-22T10:23:36.641Z",
      //   },
      // ];

      // Helper function
      const walletData = await checkWalletHoldings(txndata);

      return res.status(200).send(walletData);
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }

  async getPortfolio(req, res) {
    const { user_id } = req.query;
    const portfolio = [];
    const temp = [];
    try {
      // get all wallet ids
      const response = await axios.get(constant.wallets.GET_ALL_WALLETS, {
        params: { user_id: user_id },
      });

      const wallets = response.data.wallets;
      // get all wallet data and store into portfolio (including duplicates)
      for (let i = 0; i < wallets.length; i++) {
        const id = wallets[i].id;

        const data = await axios.get(constant.wallets.GET_WALLET_DATA, {
          params: { user_id: user_id, wallet_id: id },
        });

        const coins = data.data;
        temp.push(...coins);
      }
      // consolidate duplicate coin holdings into 1 array
      let portfolio = combineWallets(temp);

      return res.status(200).json({ success: true, data: portfolio });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  return;
}

module.exports = UsersController;

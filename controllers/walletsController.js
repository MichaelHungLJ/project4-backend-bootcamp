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
    console.log(req.query);
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
      const txndata = response.data.data; // naming gg

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

const BaseController = require("./baseController");
const axios = require("axios");
const constant = require("../constant");

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

  return;
}

module.exports = UsersController;

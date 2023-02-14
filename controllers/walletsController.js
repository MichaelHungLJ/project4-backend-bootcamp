const BaseController = require("./baseController");
const axios = require("axios");
const constant = require("../constant");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // GET request
  async getAllWallets(req, res) {
    const { name } = req.params;

    try {
      // Get user id first
      const response = await axios.get("http://localhost:3000/users/" + name);

      const data = await this.model.findAll({
        where: { user_id: response.data.id },
      });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async getWalletId(req, res) {
    const { address } = req.params;
    try {
      const response = await this.model.findOne({
        where: { address: address },
      });
      return res.status(200).json(response.dataValues.id);
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  // Input query params: {name : walletName}
  async getWalletIdByName(req, res) {
    const { name } = req.query;

    try {
      const response = await this.model.findOne({
        where: {
          name: name,
        },
      });
      return res.status(200).json(response.dataValues.id);
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async addWallet(req, res) {
    // INPUTS
    const { name, address, type, user } = req.body;

    try {
      // response.data.id - get current user_id
      const response = await axios.get("http://localhost:3000/users/" + user);

      const payload = {
        name: name,
        address: address,
        type: type,
        user_id: response.data.id,
      };
      const data = await this.model.create(payload);

      return res.status(200).json({ success: true, message: "Wallet added" });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async updateWallet(req, res) {
    const { name, address, user } = req.body;
    try {
      // response.data.id - get current user_id
      const response = await axios.get("http://localhost:3000/users/" + user);

      const data = await this.model.update(
        { name: name },
        {
          where: {
            address: address,
            user_id: response.data.id,
          },
        }
      );

      return res
        .status(200)
        .json({ success: true, message: "Wallet name updated!" });
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  async deleteWallet(req, res) {
    try {
    } catch (err) {
      return res.status(403).json({ success: false, error: err });
    }
  }

  return;
}

module.exports = UsersController;

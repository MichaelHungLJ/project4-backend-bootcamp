const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // GET Request
  // Input query body { email : email }
  async getUserId(req, res) {
    const data = await this.model.findOne({
      where: { email: req.query.email },
    });

    const id = data.id;

    return res.json({ id: id });
  }

  // POST request
  // Input body: {name:name, email:email, password:password}
  async createUser(req, res) {
    const { name, email, password } = req.body;

    /// VALIIDATION ///
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "missing inputs" });
    }

    const checkUser = await this.model.findOne({ where: { email: email } });

    if (checkUser) {
      return res.status(400).json({ success: false, message: "Email taken!" });
    }
    /// VALIDATION ///

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const payload = {
        name: name,
        email: email,
        password: hashedPassword,
      };

      const data = await this.model.create(payload);

      const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const newUser = {
        id: data.dataValues.id,
        name: data.dataValues.name,
        email: data.dataValues.email,
        image: data.dataValues.image,
        biography: data.dataValues.biography,
        accessToken: accessToken,
      };

      return res
        .status(201)
        .json({ success: true, message: "User created!", user: newUser });
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }

  // POST request
  // Input: { email : email, password: password}
  async loginUser(req, res) {
    const user = await this.model.findOne({
      where: { email: req.body.email },
    });

    /// VALIDATION ///
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong email/password" });
    }
    /// VALIDATION ///

    try {
      const match = await bcrypt.compare(req.body.password, user.password);

      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const loggedUser = {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
        image: user.dataValues.image,
        biography: user.dataValues.biography,
        accessToken: accessToken,
      };

      if (match) {
        return res.status(200).json({ success: true, user: loggedUser });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credentials" });
      }
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }
}

module.exports = UsersController;

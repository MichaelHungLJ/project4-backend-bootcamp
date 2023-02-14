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

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "missing inputs" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const payload = {
        name: name,
        email: email,
        password: hashedPassword,
      };

      const data = await this.model.create(payload);

      return res.json({ success: true, message: "User created!" });
    } catch (err) {
      return res.json({ success: false, error: err });
    }
  }

  // POST request
  // Input: { name : name, password: password}
  async loginUser(req, res) {
    const user = await this.model.findOne({
      where: { name: req.body.name },
    });

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

      if (match) {
        return res.json({ accessToken: accessToken });
      } else {
        return res.json({ message: "Invalid Credentials" });
      }
    } catch (err) {
      console.log("Error: ", err);
      return res.json({ success: false, error: err });
    }
  }
}

module.exports = UsersController;

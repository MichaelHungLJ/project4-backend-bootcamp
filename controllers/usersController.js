const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const BaseController = require("./baseController");
const {
  UnauthorizedError,
  AlreadyTakenError,
} = require("../helpers/customError.js");

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

  async getAllUserId(req, res) {
    const data = await this.model.findAll();
    const ids = [];
    data.map((data) => ids.push(data.id));
    return res.send(ids);
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

      const userExists = await this.model.findOne({
        where: { email: req.body.email },
      });
      if (userExists) throw new AlreadyTakenError("Email", "try logging in");

      // creating user
      console.log("payload:", payload);
      const newuser = await this.model.create(payload);

      console.log("newuser,", newuser);

      delete newuser.dataValues.password;

      newuser.dataValues.token = await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.log("register UUUUUUUUUSSSSSSSSSEEEEEEERRRRRRR",newuser)


      // console.log("Wtf is newuser", newuser)
      return res.status(200).json({ newuser });
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }

  // POST request
  // Input: { email : email, password: password}
  async loginUser(req, res) {
    console.log("req", req.body);
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
      console.log("req.body.password", req.body.password);
      console.log("user.password", user.password);
      const match = await bcrypt.compare(req.body.password, user.password);

      console.log("match", match);
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      user.dataValues.token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log(".login UUUUUUUUUSSSSSSSSSEEEEEEERRRRRRR",user)

      if (match) {
        return res.json({ user });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Credentials" });
      }
    } catch (err) {
      return res.status(400).json({ success: false, error: err });
    }
  }

  async currentUser(req, res) {
    try {
      const loggedUser = req.verifiedToken;
      if (!loggedUser) throw new UnauthorizedError();

      const user = await this.model.findOne({
        where: { email: loggedUser.email },
      });

      delete user.dataValues.password
      console.log("UUUUUUUUUSSSSSSSSSEEEEEEEERRRRRRR", user.dataValues)
      res.json({ user: user.dataValues });
    } catch (error) {
      console.log("Error!", error);
    }
  }
}

module.exports = UsersController;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const BaseController = require("./baseController");
const { UnauthorizedError, AlreadyTakenError } = require('../helpers/customError.js')

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Input as params (name)
  async getUserId(req, res) {
    const data = await this.model.findOne({ where: { name: req.params.name } });

    const id = data.id;

    return res.json({ id: id });
  }

  // POST request
  // Input: {name:name, email:email, password:password}
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

      const userExists = await this.model.findOne({
        where: { email: req.body.email },
      });
      if (userExists) throw new AlreadyTakenError("Email", "try logging in");

      // creating user
      console.log("payload:",payload)
      const newuser = await this.model.create(payload);

      console.log("newuser,",newuser)

      newuser.dataValues.password = null

      newuser.dataValues.token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:"1h"
      })

      // console.log("Wtf is newuser", newuser)
      return res.status(200).json({newuser});
    } catch (err) {
      console.log(err)
      return res.json({ success: false, error: err });
    }
  }

  // POST request
  // Input: { name : name, password: password}
  async loginUser(req, res) {

    console.log("req",req.body)
    const user = await this.model.findOne({
      where: { name: req.body.name },
    });

    console.log("user",user)
    
    try {
      console.log("req.body.password",req.body.password)
      console.log("user.password",user.password)
      const match = await bcrypt.compare(req.body.password, user.password);

      console.log("match",match)
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      user.dataValues.token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });


      if (match) {
        return res.json({ user });
      } else {
        return res.json({ message: "Invalid Credentials" });
      }
    } catch (err) {
      console.log("Error: ", err);
      return res.json({ success: false, error: err });
    }
  }


  async currentUser(req, res){
    try {
      const loggedUser = req.verifiedToken;
      if (!loggedUser) throw new UnauthorizedError();
  
      // delete loggedUser.password
      res.json({ user: loggedUser });
    } catch (error) {
      console.log("Error!",error)
    }
  }

}

module.exports = UsersController;

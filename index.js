// import useful packages
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

// import models
const db = require("./db/models/index");
// import middlewares

// import controllers
const UsersController = require("./controllers/usersController");

// initialize controllers
const usersController = new UsersController(db.user);

// import routers
const UsersRouter = require("./routers/usersRouter");

// initialize routers
const usersRouter = new UsersRouter(usersController).routes();

// axios.get("https://api.coingecko.com/api/v3/ping").then((response) => {
//   console.log(response.data);
// });

// Put express together below this line
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

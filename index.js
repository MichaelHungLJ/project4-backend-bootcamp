// import useful packages
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const CronJob = require("cron").CronJob;
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// import models
const db = require("./db/models/index");
// import middlewares

// import controllers
const UsersController = require("./controllers/usersController");
const CoinlistController = require("./controllers/coinlistController");

// initialize controllers
const usersController = new UsersController(db.user);
const coinlistController = new CoinlistController(db.coinlist);

// import routers
const UsersRouter = require("./routers/usersRouter");
const CoinlistRouter = require("./routers/coinlistRouter");

// initialize routers
const usersRouter = new UsersRouter(usersController).routes();
const coinlistRouter = new CoinlistRouter(coinlistController).routes();

// Put express together below this line
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/coinlist", coinlistRouter);

var getCoinList = new CronJob(
  "0 */1 * * * *",
  async function () {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    console.log(response.data);
  },
  null
);

getCoinList.start();

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

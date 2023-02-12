// import useful packages
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const CronJob = require("cron").CronJob;
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// import models
const db = require("./db/models");
const { users, wallets, transactions, coinlists } = db;

// import middlewaresc
const auth = require("./middleware/auth");

// import controllers
const UsersController = require("./controllers/usersController");
const WalletsController = require("./controllers/walletsController");
const CoinlistController = require("./controllers/coinlistController");

// initialize controllers
const usersController = new UsersController(users);
const walletController = new WalletsController(wallets);
const coinlistController = new CoinlistController(coinlists);

// import routers
const UsersRouter = require("./routers/usersRouter");
const WalletsRouter = require("./routers/walletsRouter");
const CoinlistRouter = require("./routers/coinlistRouter");

// initialize routers
const usersRouter = new UsersRouter(usersController, auth).routes();
const walletsRouter = new WalletsRouter(walletController).routes();
const coinlistRouter = new CoinlistRouter(coinlistController).routes();

// Put express together below this line
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/wallets", walletsRouter);
app.use("/coinlist", coinlistRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// import useful packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import models
// const db = require("./models/index");

// import middlewares

// import controllers

// initialize controllers

// import routers

// initialize routers

// Put express together below this line
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

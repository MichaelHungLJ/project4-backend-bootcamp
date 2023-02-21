const axios = require("axios");
const CronJob = require("cron").CronJob;
const constant = require("../constant");

const updateAllUserPortfolio = async () => {
  let id_array = [];

  try {
    const response = await axios.get(constant.users.GET_ALL_ID);
    id_array = response.data;
  } catch (err) {
    console.log(err);
  }

  const dailyUpdate = new CronJob("0 0 * * *", async () => {
    for (let i = 0; i < id_array.length; i++) {
      const id = id_array[0];
      const update = await axios.post(
        constant.portfolio.UPDATE_PORTFOLIO_DAILY,
        { user_id: id }
      );
    }
  });

  dailyUpdate.start();
};

module.exports = updateAllUserPortfolio;

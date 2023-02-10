const axios = require("axios");
const CronJob = require("cron").CronJob;

const updateCoinList = () => {
  const testCron = new CronJob("* * * * * *", () => {
    console.log("Tick");
  });

  testCron.start();
};

// var getCoinList = new CronJob(
//   "0 */1 * * * *",
//   async function () {
//     const response = await axios.get(
//       "https://api.coingecko.com/api/v3/coins/list"
//     );
//     console.log(response.data);
//   },
//   null
// );

// getCoinList.start();

module.exports = updateCoinList;

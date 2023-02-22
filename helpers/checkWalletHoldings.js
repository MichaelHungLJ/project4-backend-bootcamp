const axios = require("axios");
const constant = require("../constant");

async function checkWalletHoldings(txndata) {
  const walletData = [{ coin: "USD", amt: 0, curr_price: 1, value: 0 }];

  try {
    // 1. Check for all unique coins transacted and add into array-obj
    txndata.forEach((element) => {
      const ticker = element.coin;
      const coinExist = walletData.some((item) => item.coin === ticker);
      if (!coinExist) {
        walletData.push({ coin: ticker, amt: 0, curr_price: 0, value: 0 });
      }
    });

    // 2. Add/Subtract to respective coin holdings based on buy/sell/deposit
    // 2.1 Buy/Sell -> Affect USD stable holdings

    await Promise.all(
      txndata.map(async (element) => {
        const ticker = element.coin;
        const index = walletData.findIndex(
          (element) => element.coin === ticker
        );
        const amount = parseFloat(element.quantity);
        const price = parseFloat(element.price);
        const value = amount * price;
        // type - buy , sell, deposit
        if (element.type === "Deposit") {
          walletData[index]["amt"] += amount;
        } else if (element.type === "Buy") {
          // Add to XYZ holdings
          walletData[index]["amt"] += amount;

          // Subtract from USD holdings
          walletData[0]["amt"] -= value;
        } else if (element.type === "Sell") {
          walletData[index]["amt"] -= amount;
          // Hope you lose money
          walletData[0]["amt"] += value;
        }

        /// Save me ///

        if (!(ticker === "USD")) {
          // Get the coin ID from coinlist controller
          const response = await axios.get(constant.coinlist.GET_COIN_ID, {
            params: { coin: ticker },
          });

          const coinId = response.data.data.coinId;

          // Get current coin price from coingecko API
          console.log("COINGECKO API STARTS HERE");
          const coinGeckoPrice = await axios.get(
            constant.coingecko.COIN_PRICE + `?ids=${coinId}&vs_currencies=usd`
          );
          const curr_price = coinGeckoPrice.data[`${coinId}`][`usd`];
          console.log("COINGECKO API ENDS HERE");
          walletData[index]["curr_price"] = curr_price;
        }

        // Add total value of XYZ holdings based on current price (from CoinGecko)
        walletData[index]["value"] = (
          walletData[index]["amt"] * walletData[index]["curr_price"]
        ).toFixed(2);
      })
    );

    /// Get current value for USD holdings
    walletData[0]["value"] = (walletData[0]["amt"] * 1).toFixed(2);

    return walletData;
  } catch (err) {
    return res.status(400).send("Error", err);
  }
}

module.exports = checkWalletHoldings;

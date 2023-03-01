const axios = require("axios");
const constant = require("../constant");

async function checkWalletHoldings(txndata) {
  const walletData = [{ coin: "USD", amt: 0, curr_price: 1, value: 0 }];

  // 1. Check for all unique coins transacted and add into array-obj
  // 2. Add/Subtract to respective coin holdings based on buy/sell/deposit
  // 2.1 Buy/Sell -> Affect USD stable holdings
  txndata.forEach((element) => {
    const ticker = element.coin;
    const coinExist = walletData.some((item) => item.coin === ticker);
    if (!coinExist) {
      walletData.push({ coin: ticker, amt: 0, curr_price: 0, value: 0 });
    }

    const index = walletData.findIndex((element) => element.coin === ticker);
    const amount = parseFloat(element.quantity);
    const price = parseFloat(element.price);
    const type = element.type;
    const value = amount * price;

    if (type === "Deposit") {
      walletData[index]["amt"] += amount;
    } else if (type === "Buy") {
      // Add to XYZ holdings
      walletData[index]["amt"] += amount;

      // Subtract from USD holdings
      walletData[0]["amt"] -= value;
    } else if (type === "Sell") {
      // Sub from XYZ holdings
      walletData[index]["amt"] -= amount;

      // Add to USD holdings
      walletData[0]["amt"] += value;
    }
  });

  try {
    for (element of walletData) {
      if (!(element.coin === "USD")) {
        // Get the coin ID from coinlist controller
        const response = await axios.get(constant.coinlist.GET_COIN_ID, {
          params: { coin: element.coin },
        });
        const coinId = response.data.data.coinId;

        console.log(`Coin ID ${coinId}`);

        // Get current coin price from coingecko API
        console.log("DEFI-LLAMA THE BEST API STARTS HERE");
        // const coinGeckoPrice = await axios.get(
        //   constant.coingecko.COIN_PRICE + `?ids=${coinId}&vs_currencies=usd`
        // );
        // const curr_price = coinGeckoPrice.data[`${coinId}`][`usd`];

        /// We change to defi llama since they have better rate-limit
        const defiLlamaPrice = await axios.get(
          `https://coins.llama.fi/prices/current/coingecko:${coinId}?searchWidth=1h`
        );

        // console.log(defiLlamaPrice);
        const current_price =
          defiLlamaPrice.data.coins[`coingecko:${coinId}`].price;
        console.log("DEFI-LLAMA THE BEST API ENDS HERE");

        const current_value = element.amt * current_price;
        // console.log(`Current amount ${element.amt}`);
        // console.log(`Current price ${current_price}`);
        // console.log(`Current value ${current_value}`);
        element["curr_price"] = current_price;
        element["value"] = parseFloat(current_value.toFixed(2));
      }
    }

    // Base case for USD holdings
    walletData[0]["value"] = walletData[0]["amt"] * 1;

    console.log(walletData);
    return walletData;
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: `Error` });
  }
}

module.exports = checkWalletHoldings;

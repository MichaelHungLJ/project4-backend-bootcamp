const axios = require("axios");
const constant = require("../constant");

function formatTxnData(txndata) {
  const walletData = [{ coin: "USD", amt: 0, curr_price: 1, value: 0 }];

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

  return walletData;
}

module.exports = formatTxnData;

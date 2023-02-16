function checkWalletHoldings(txndata) {
  const walletData = [{ coin: "USD", amt: 0, curr_price: 1, value: 0 }];

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

  txndata.forEach((element) => {
    const ticker = element.coin;
    const index = walletData.findIndex((element) => element.coin === ticker);
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

    // Here comes the coingecko API
    // death and destruction

    /// Save me ///

    // Add total value of XYZ holdings based on current price (from CoinGecko)
    walletData[index]["value"] =
      walletData[index]["amt"] * walletData[index]["curr_price"];
  });

  /// Get current value for USD holdings
  walletData[0]["value"] = walletData[0]["amt"] * 1;

  return walletData;
}

module.exports = checkWalletHoldings;

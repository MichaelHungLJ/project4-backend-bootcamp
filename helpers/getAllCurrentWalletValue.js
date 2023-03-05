const axios = require("axios");
const constant = require("../constant");
const formatTxnData = require("../helpers/formatTxnData");

async function getAllCurrentWalletValue(walletList, user_id) {
  const array = [];
  try {
    for (wallet of walletList) {
      const getTxn = await axios.get(constant.transactions.GET_WALLET_TXNS, {
        params: { wallet_id: wallet.id, user_id: user_id },
      });

      const txn = getTxn.data.data;

      const payload = { wallet: wallet, alltxn: txn };
      array.push(payload);
    }
  } catch (err) {
    console.error(err);
  }

  /// No impt - can refactor ///
  const arr = [];
  for (walletInfo of array) {
    const formattedTxn = formatTxnData(walletInfo.alltxn);
    arr.push(...formattedTxn);
    walletInfo["formatTxn"] = formattedTxn;
  }

  const coinArray = [];
  for (asset of arr) {
    const hasCoin = coinArray.some((obj) =>
      Object.keys(obj).some((key) => obj[key] === asset.coin)
    );
    const obj = { coin: asset.coin };
    if (!hasCoin) {
      coinArray.push(obj);
    }
  }

  try {
    for (element of coinArray) {
      if (element.coin === "USD") {
        element["price"] = 1;
      } else {
        const response = await axios.get(constant.coinlist.GET_COIN_ID, {
          params: { coin: element.coin },
        });
        const coinId = response.data.data.coinId;
        console.log("DEFI-LLAMA THE BEST API STARTS HERE");
        const defiLlamaPrice = await axios.get(
          `https://coins.llama.fi/prices/current/coingecko:${coinId}?searchWidth=1h`
        );
        console.log("DEFI-LLAMA THE BEST API ENDS HERE");

        const price = defiLlamaPrice.data.coins[`coingecko:${coinId}`].price;

        element["price"] = price;
      }
      // console.log(coinArray);
    }
  } catch (err) {
    console.error(err);
  }

  for (walletInfo of array) {
    for (txn of walletInfo.formatTxn) {
      const found = coinArray.find((item) => item.coin === txn.coin);
      if (found) {
        txn.curr_price = found.price;
        txn.value = parseFloat((txn.curr_price * txn.amt).toFixed(2));
        console.log(txn);
      }
    }
  }

  return array;
}

module.exports = getAllCurrentWalletValue;

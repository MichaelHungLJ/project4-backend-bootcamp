function combineWallets(input) {
  const output = {};
  for (const item of input) {
    if (!output[item.coin]) {
      output[item.coin] = {
        coin: item.coin,
        amt: 0,
        value: 0,
      };
    }
    output[item.coin].amt += item.amt;
    output[item.coin].value += parseFloat(item.value);
  }

  const result = Object.values(output);

  return result;
}

module.exports = combineWallets;

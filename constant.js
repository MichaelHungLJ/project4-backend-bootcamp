module.exports = {
  users: {
    GET_USER_ID: `http://localhost:${process.env.PORT}/users/getUserId`,
  },
  wallets: {
    GET_ALL_WALLETS: `http://localhost:${process.env.PORT}/wallets/getAllWallets`,
    GET_WALLET_ID: `http://localhost:${process.env.PORT}/wallets/getWalletId`,
    ADD_WALLET: `http://localhost:${process.env.PORT}/wallets/addWallet`,
    UPDATE_WALLET: `http://localhost:${process.env.PORT}/wallets/updateWallet`,
    DELETE_WALLET: `http://localhost:${process.env.PORT}/wallets/deleteWallet`,
    GET_WALLET_DATA: `http://localhost:${process.env.PORT}/wallets/getWalletData`,
    GET_ALL_HOLDINGS: `http://localhost:${process.env.PORT}/wallets/getPortfolio`,
  },
  transactions: {
    GET_ALL_TXNS: `http://localhost:${process.env.PORT}/transactions/getAllTransactions`,
    GET_WALLET_TXNS: `http://localhost:${process.env.PORT}/transactions/getWalletTransactions`,
    ADD_TXN: `http://localhost:${process.env.PORT}/transactions/addTransaction`,
  },
  coinlist: {
    GET_COIN_ID: `http://localhost:${process.env.PORT}/coinlist/getCoinId`,
  },
  coingecko: {
    GET_ALL_COIN_IDS: `https://api.coingecko.com/api/v3/coins/list`,
    COIN_PRICE: `https://api.coingecko.com/api/v3/simple/price`,
  },
  portfolio: {
    GET_PORTFOLIO_GROWTH: `http://localhost:${process.env.PORT}/portfolio/getPortfolioGrowth`,
  },
};

module.exports = {
  url: {
    GET_USER_ID: `http://localhost:${process.env.PORT}/users/getUserId`,
    GET_WALLET_ID_BY_WALLET_NAME: `http://localhost:${process.env.PORT}/wallets/getWalletIdByName`,
  },
  wallets: {
    GET_ALL_WALLETS: `http://localhost:${process.env.PORT}/wallets/getAllWallets`,
    GET_WALLET_ID: `http://localhost:${process.env.PORT}/wallets/getWalletId`,
    ADD_WALLET: `http://localhost:${process.env.PORT}/wallets/addWallet`,
    UPDATE_WALLET: `http://localhost:${process.env.PORT}/wallets/updateWallet`,
    DELETE_WALLET: `http://localhost:${process.env.PORT}/wallets/deleteWallet`,
  },
};

export const clientlibConfig = {
  relayUrl: process.env.REACT_APP_RELAY_URL
    ? process.env.REACT_APP_RELAY_URL
    : "https://wallet.dfumm.com/api/v1",
  messagingUrl: process.env.REACT_APP_MESSAGING_URL
    ? process.env.REACT_APP_MESSAGING_URL
    : "wss://wallet.dfumm.com/api/v1",
  chainId: 4660,
  walletType: "identity",
  identityImplementationAddress: process.env
    .REACT_APP_IDENTITY_IMPLEMENTATION_ADDRESS
    ? process.env.REACT_APP_IDENTITY_IMPLEMENTATION_ADDRESS
    : "0x0F9cBe23B774951cc5a8187C1685bD00F6e3be2d",
  identityFactoryAddress: process.env.REACT_APP_IDENTITY_FACTORY_ADDRESS
    ? process.env.REACT_APP_IDENTITY_FACTORY_ADDRESS
    : "0xe648409Ef281B06E4a48e1c8225eF45bAB0FB399",
};

export const __DEV__ = process.env.NODE_ENV === "development";
export const LOG = __DEV__;

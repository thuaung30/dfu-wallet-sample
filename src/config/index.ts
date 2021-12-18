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
    : "0x7C443d388b1625B99816b7921560a586551081c4",
  identityFactoryAddress: process.env.REACT_APP_IDENTITY_FACTORY_ADDRESS
    ? process.env.REACT_APP_IDENTITY_FACTORY_ADDRESS
    : "0x43e7ed7F5bcc0beBE8758118fae8609607CD874f",
};

export const __DEV__ = process.env.NODE_ENV === "development";
export const LOG = __DEV__;

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_RELAY_URL: string;
    REACT_APP_MESSAGING_URL: string;
    REACT_APP_IDENTITY_IMPLEMENTATION_ADDRESS: string;
    REACT_APP_IDENTITY_FACTORY_ADDRESS: string;
  }
}
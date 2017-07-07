export const config = {
  port: 3000,
  host: {
    android: '10.0.3.2',
    ios: 'localhost',
  },
  pubnub: {
    authKey: 'server-auth',
    subscribeKey: 'sub-c-25ff9f44-7f85-11e6-8a0d-0619f8945a4f',
    publishKey: 'pub-c-52fbe46d-e262-4034-91ae-c9495b7550e6',
    secretKey: 'sec-c-ZjZkMzJiYzgtMTdhNC00MmZjLWIxNDEtMDVlNTkxZTQyOTkz',
  },
  github: {
    ios: {
      clientId: '31f22fa6339b4b4c1bdd',
      clientSecret: 'a4b0185bcd7b756431d7d14daca05f947bd5ccd9',
    },
  },
};


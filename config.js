export const config = {
  port: 3000,
  host: {
    android: '10.0.3.2',
    ios: 'localhost',
  },
  pubnub: {
    authKey: 'server-auth',
    subscribeKey: 'sub-c-65b524aa-ee99-11e6-a5f4-02ee2ddab7fe',
    publishKey: 'pub-c-ec19e776-9092-4b9c-af3c-1d9528bdfcd8',
    secretKey: 'sec-c-Y2ZlZWIzMGUtYjNhOC00ZGY1LWEyZjEtYmM5MTZkMjY0MGI5',
  },
  github: {
    ios: {
      clientId: '31f22fa6339b4b4c1bdd',
      clientSecret: 'a4b0185bcd7b756431d7d14daca05f947bd5ccd9',
    },
  },
};


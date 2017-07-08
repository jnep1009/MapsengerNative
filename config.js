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
      clientId: 'b984fc85edb06d9d7b13',
      clientSecret: 'ac405beb0b00b563944bef7df1c7a5e920a6eca4',
    },
  },
};


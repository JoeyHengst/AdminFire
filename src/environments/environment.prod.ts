import { IConfig } from './iconfig';

export const environment = {
  production: true,
};

// Must export the config
export const CONFIG: IConfig = {
  "firebaseConfig": {
    apiKey: '<API_KEY>',
    authDomain: '<AUTH_DOMAIN>',
    databaseURL: '<DATABASE_URL>',
    storageBucket: '<STORAGE_BUCKET>',
    messagingSenderId: '<MESSAGING_ID>'
  }
};
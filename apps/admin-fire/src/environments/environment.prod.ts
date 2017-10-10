import { IConfig } from './iconfig';

export const environment = {
  production: true,
};

// Must export the config
export const CONFIG: IConfig = {
  "firebaseConfig": {
    apiKey: "AIzaSyBIKfH3UqXFdVCrlpkRi1pNekhX5RIdXCQ",
    authDomain: "fir-admin-bb8e0.firebaseapp.com",
    databaseURL: "https://fir-admin-bb8e0.firebaseio.com",
    projectId: "fir-admin-bb8e0",
    storageBucket: "fir-admin-bb8e0.appspot.com",
    messagingSenderId: "23601822672"
  }
};
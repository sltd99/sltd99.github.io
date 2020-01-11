const firebase = require("firebase");
require("firebase/firestore");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBtXP7szv3Yri7Z6SOApsjFF96isZJYEfI",
    authDomain: "chatapp-aac3f.firebaseapp.com",
    databaseURL: "https://chatapp-aac3f.firebaseio.com",
    projectId: "chatapp-aac3f",
    storageBucket: "chatapp-aac3f.appspot.com",
    messagingSenderId: "801272197681",
    appId: "1:801272197681:web:cb4c9f6813abe42df25b10",
    measurementId: "G-M6YTT80Z80"
  });
}

const db = firebase.firestore();

export default db;

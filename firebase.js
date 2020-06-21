import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyAKmOUurFTSOD6NYcd_ZRGYJEwY1Rf0ESk",
  authDomain: "online-presence-detector.firebaseapp.com",
  databaseURL: "https://online-presence-detector.firebaseio.com",
  projectId: "online-presence-detector",
  storageBucket: "online-presence-detector.appspot.com",
  messagingSenderId: "107091636746",
  appId: "1:107091636746:web:526daae7024e0f89aaa5f3",
  measurementId: "G-5NCDLNT613"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    firebaseDB,
    googleAuth
}

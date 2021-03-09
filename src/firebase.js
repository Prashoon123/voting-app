import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDWVKXKy6XcKp5bT08PXiBd-8WhfqrJ5GY",
  authDomain: "voting-app-prashoon.firebaseapp.com",
  projectId: "voting-app-prashoon",
  storageBucket: "voting-app-prashoon.appspot.com",
  messagingSenderId: "1023542323328",
  appId: "1:1023542323328:web:0c17cdd258d8f74cf9de65",
  measurementId: "G-M8C6HBMNK3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;

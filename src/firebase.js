import firebase from "firebase";

const firebaseConfig = {
  // ENTER YOUR APP'S FIREBASE CONFIG HERE
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;

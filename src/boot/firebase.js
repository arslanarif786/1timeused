import {
  initializeApp
} from "firebase/app";
// import {
//   getAnalytics
// } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD___g4E1-hrejER1ucPQAfoMBJ1bRlXQ4",
  authDomain: "onetimeused-945b6.firebaseapp.com",
  projectId: "onetimeused-945b6",
  storageBucket: "onetimeused-945b6.appspot.com",
  messagingSenderId: "605433633770",
  appId: "1:605433633770:web:526bc5614a739e632bf093",
  measurementId: "G-QPHZE2Y0VT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const db = getFirestore(app);


const firebase = {
  app,
}

export default firebase;

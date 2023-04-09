
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjfUB4a2h4WD5s-agmcaWwsyyoOs_4dew",
  authDomain: "apple-b7eb4.firebaseapp.com",
  projectId: "apple-b7eb4",
  storageBucket: "apple-b7eb4.appspot.com",
  messagingSenderId: "683593743508",
  appId: "1:683593743508:web:e2e004cf1eda0d0a9fc881",
  measurementId: "G-B8RK13V4GD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, storage, auth, firestore };

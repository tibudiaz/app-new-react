
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCu96-KIWfF_v9phWWIlVi7TMz_nWxDpE0",
  authDomain: "react-14cb2.firebaseapp.com",
  projectId: "react-14cb2",
  storageBucket: "react-14cb2.appspot.com",
  messagingSenderId: "654538802149",
  appId: "1:654538802149:web:0d244ad93bd0537266a50c"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, storage, auth, firestore };

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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

export default firebase;

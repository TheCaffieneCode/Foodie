import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

firebase.initializeApp({
    apiKey: "AIzaSyD7pG0P_Ctl8mxUTlN3c6_Jtfx5LCjTDn8",
  authDomain: "zomoto-clone-38f22.firebaseapp.com",
  projectId: "zomoto-clone-38f22",
  storageBucket: "zomoto-clone-38f22.appspot.com",
  messagingSenderId: "381255411589",
  appId: "1:381255411589:web:ff862eaf8ff5e711fc86ec",
    databaseURL: 'https://zomoto-clone-38f22.appspot.com',
});


const fb = firebase;

export default fb;
// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8TZIF1TxsO1C2UPWJQ1p3rsNxxxGk7AU',
  authDomain: 'contacts-56fbe.firebaseapp.com',
  projectId: 'contacts-56fbe',
  storageBucket: 'contacts-56fbe.appspot.com',
  messagingSenderId: '945139682508',
  appId: '1:945139682508:web:793802feb3e72b441ac669',
  measurementId: 'G-RB7TCJSRPH',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
module.exports = firebase;

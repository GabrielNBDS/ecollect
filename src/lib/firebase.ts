import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC634nfPFjwbcJrBBUvU6G8uQ9whlW4UtA',
  authDomain: 'ecollect-90ea0.firebaseapp.com',
  projectId: 'ecollect-90ea0',
  storageBucket: 'ecollect-90ea0.appspot.com',
  messagingSenderId: '62888499180',
  appId: '1:62888499180:web:c84874e56f6414eedd92c9',
  measurementId: 'G-W2337JB1KE',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;

export default fire;

const { analytics } = fire;
const db = fire.firestore();
const cdn = fire.storage().ref();

export { analytics, db, cdn, firebaseConfig };

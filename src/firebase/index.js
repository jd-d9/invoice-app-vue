import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAG7BFML-KpH45eolb4E3IrACiTPokX3U8',
  authDomain: 'invoice-app-vue-4d4c6.firebaseapp.com',
  projectId: 'invoice-app-vue-4d4c6',
  storageBucket: 'invoice-app-vue-4d4c6.appspot.com',
  messagingSenderId: '894437399788',
  appId: '1:894437399788:web:3c5e91665a5c0f3526d9c9'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3BNnkS4_E6R_ZTEvvy4Vi7JIQ9h5xmuY",
  authDomain: "facepal-359fe.firebaseapp.com",
  projectId: "facepal-359fe",
  storageBucket: "facepal-359fe.appspot.com",
  messagingSenderId: "104867686648",
  appId: "1:104867686648:web:9bbe2d364b7102fa78b30d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { authentication,db,storage }
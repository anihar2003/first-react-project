// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE-qO_4bv4mtY_wgLtCJ_DEcWgMdUOLDY",
  authDomain: "react-project-36adb.firebaseapp.com",
  projectId: "react-project-36adb",
  storageBucket: "react-project-36adb.appspot.com",
  messagingSenderId: "182366066437",
  appId: "1:182366066437:web:89faf7f8893a73c20bc96c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
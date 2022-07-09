import {getFirestore} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_dYbLKzPS1weBcAfk4krcYuCBMaqOC5Q",
  authDomain: "apptocheckavailableslots.firebaseapp.com",
  databaseURL: "https://apptocheckavailableslots-default-rtdb.firebaseio.com",
  projectId: "apptocheckavailableslots",
  storageBucket: "apptocheckavailableslots.appspot.com",
  messagingSenderId: "134369764972",
  appId: "1:134369764972:web:68cc7e95e420c525711a49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


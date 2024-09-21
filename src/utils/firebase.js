// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu45II79SJ5ZBPzZgc1QMKYDEfhXGUPcs",
  authDomain: "netflixgpt-300f5.firebaseapp.com",
  databaseURL: "https://netflixgpt-300f5-default-rtdb.firebaseio.com",
  projectId: "netflixgpt-300f5",
  storageBucket: "netflixgpt-300f5.appspot.com",
  messagingSenderId: "655137842087",
  appId: "1:655137842087:web:d05eecba87db34f1e30c82",
  measurementId: "G-PQK0PS5PHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export default auth;


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ6FfE6AR04ca_0h1wj5y0C-UEBd5oVRY",
  authDomain: "celebrating-dad-80058.firebaseapp.com",
  projectId: "celebrating-dad-80058",
  storageBucket: "celebrating-dad-80058.appspot.com",
  messagingSenderId: "773876651902",
  appId: "1:773876651902:web:7f805e1a69cb28339a852f",
  measurementId: "G-9XWVT61YGH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
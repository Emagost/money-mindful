import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXpGxGixIpncAPIw40UCKgX9syLmzXKYI",
  authDomain: "money-mindful-46a2e.firebaseapp.com",
  projectId: "money-mindful-46a2e",
  storageBucket: "money-mindful-46a2e.appspot.com",
  messagingSenderId: "810584552781",
  appId: "1:810584552781:web:391dc9a0ead7cc6265b304",
  measurementId: "G-CQ5GZ8FGCM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

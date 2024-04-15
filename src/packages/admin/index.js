import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU-z2Y0_n8rdSXPC_TXW1RE1He4er2FWA",
  authDomain: "next-32162.firebaseapp.com",
  projectId: "next-32162",
  storageBucket: "next-32162.appspot.com",
  messagingSenderId: "783848463952",
  appId: "1:783848463952:web:7ab6da67b6478f16297b55",
  measurementId: "G-7TC20ZQ8PE",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

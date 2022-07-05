// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAMzIK2m53I8IEATC1dZr3x_ZZ1nxNU-G4",
  authDomain: "gym-membership-01.firebaseapp.com",
  projectId: "gym-membership-01",
  storageBucket: "gym-membership-01.appspot.com",
  messagingSenderId: "779251712225",
  appId: "1:779251712225:web:1db0f0844eaf0ba026b7a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
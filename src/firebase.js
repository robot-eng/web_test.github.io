import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpasprqrM4d40gYvh0xYIfoUimeradoYw",
  authDomain: "datawork-c0629.firebaseapp.com",
  projectId: "datawork-c0629",
  storageBucket: "datawork-c0629.firebasestorage.app",
  messagingSenderId: "519695035300",
  appId: "1:519695035300:web:4ea85a295191046bb82f31",
  measurementId: "G-DTLPVGKTJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics if supported
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, db, analytics };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_tKoB5z-ZAPMge1mQ9oTpnTX_E60bJbY",
  authDomain: "ware-c91af.firebaseapp.com",
  projectId: "ware-c91af",
  storageBucket: "ware-c91af.firebasestorage.app",
  messagingSenderId: "71645119038",
  appId: "1:71645119038:web:40ea747e5fabddf1f1476f",
  measurementId: "G-TDYTT5XDVW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

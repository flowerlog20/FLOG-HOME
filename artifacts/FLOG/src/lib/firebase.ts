import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAk3HTnLpfLEtAfPRQuAnk6uh-CMy-T28",
  authDomain: "flog-home.firebaseapp.com",
  projectId: "flog-home",
  storageBucket: "flog-home.firebasestorage.app",
  messagingSenderId: "69523676887",
  appId: "1:69523676887:web:d59db87922e5b24abdda92",
  measurementId: "G-CFF1K0B10J",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});

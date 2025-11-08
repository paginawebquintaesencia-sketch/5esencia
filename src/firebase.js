// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg0o-AMsidie7Ol2UX35Eg_OsBTADysMc",
  authDomain: "cia-f321a.firebaseapp.com",
  projectId: "cia-f321a",
  storageBucket: "cia-f321a.firebasestorage.app",
  messagingSenderId: "355552771093",
  appId: "1:355552771093:web:03fa1010ba2855897ce21c",
  measurementId: "G-XMWDG5GVE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Fuerza persistencia local para que la sesión sobreviva a recargas y navegación
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Error configurando persistencia de Auth:", err);
});

export { db, auth, analytics };

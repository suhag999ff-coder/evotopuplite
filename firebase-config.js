/* ═══════════ FIREBASE CONFIG & INIT ═══════════ */
const firebaseConfig = {
  apiKey: "AIzaSyCfsjOw9iprzBGmF4zjPvwhm8y71hcSAm0",
  authDomain: "evo-topup-75dd1.firebaseapp.com",
  databaseURL: "https://evo-topup-75dd1-default-rtdb.firebaseio.com",
  projectId: "evo-topup-75dd1",
  storageBucket: "evo-topup-75dd1.firebasestorage.app",
  messagingSenderId: "1071658366754",
  appId: "1:1071658366754:web:5bba4a99153d2a2f9c977b"
};

let db, auth;
try {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  auth = firebase.auth();
} catch(e) { console.error('Firebase init error:', e); }
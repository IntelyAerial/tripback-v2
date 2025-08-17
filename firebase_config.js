import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAptTU7F2FD5G6ayNWldG1UQlAgycqpoGA",
  authDomain: "travelmate-2025.firebaseapp.com",
  databaseURL: "https://travelmate-2025-default-rtdb.firebaseio.com", // ✅ Lägg till denna rad
  projectId: "travelmate-2025",
  storageBucket: "travelmate-2025.firebasestorage.app",
  messagingSenderId: "717656692605",
  appId: "1:717656692605:web:d7ea4a0ca62e68ec885e14",
  measurementId: "G-2R8W7J6DBQ"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

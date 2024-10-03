import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjVg_9jpwjzbUXBBFd2xz2-tBFga9KwHs",
  authDomain: "mynotesapp-01.firebaseapp.com",
  projectId: "mynotesapp-01",
  storageBucket: "mynotesapp-01.appspot.com",
  messagingSenderId: "261304492773",
  appId: "1:261304492773:web:360ab314c89268a1286a0c",
  measurementId: "G-8ZGYQ6Q9WB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firestore and Authentication via Firebase
export const auth = getAuth();
export const db = getFirestore();

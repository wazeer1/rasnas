import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBF9C8qzYaGucIgiVcdp3QIei_b103rsKY",
  authDomain: "rasnas-4f64c.firebaseapp.com",
  projectId: "rasnas-4f64c",
  storageBucket: "rasnas-4f64c.firebasestorage.app",
  messagingSenderId: "1081916889571",
  appId: "1:1081916889571:web:8e0cfd439f935bb6f1a8d6",
  measurementId: "G-KV1DGH1SGC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize analytics with a type annotation
let analytics: Analytics | null = null;

// Async function to initialize analytics if supported
const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    analytics = getAnalytics(app);
  }
};

const googleProvider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result, "result");
    return result.user; // Returns the authenticated user
  } catch (error) {
    console.error("Google login error:", error);
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

initAnalytics();

export { app, analytics, loginWithGoogle, logout };

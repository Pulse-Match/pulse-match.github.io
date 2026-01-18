import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_GLID_APP_API_KEY",
  authDomain: "glid-app.firebaseapp.com",
  projectId: "glid-app",
  storageBucket: "glid-app.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_SENDER_ID",
  appId: "REPLACE_WITH_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

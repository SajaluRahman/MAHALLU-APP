
import { initializeApp, getApps, deleteApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

// Initialize primary app if not already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const firebaseApp = app as FirebaseApp;
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);


export function initSecondaryAuth(): { auth: Auth; delete: () => Promise<void> } {
  // Name must be unique; use timestamp or random
  const name = `secondary-${Date.now()}`;
  const secondaryApp = initializeApp(firebaseConfig, name);
  const secondaryAuth = getAuth(secondaryApp);
  return {
    auth: secondaryAuth,
    delete: async () => {
      // sign out secondary user if any
      try {
        await secondaryAuth.signOut();
      } catch (_) {}
      await deleteApp(secondaryApp);
    },
  };
}

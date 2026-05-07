import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBTXod-RojEYOAgk85i0DVrmvpbOm171SI",
    authDomain: "toyproject-6b0f9.firebaseapp.com",
    projectId: "toyproject-6b0f9",
    storageBucket: "toyproject-6b0f9.firebasestorage.app",
    messagingSenderId: "476306065849",
    appId: "1:476306065849:web:7ac838ce7d6a3cfd2b4e68"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    provide: {
      db
    }
  };
});

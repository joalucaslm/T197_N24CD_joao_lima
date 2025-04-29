import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAt6iBS8400ivNJv_oviZp1x4kldbP_nk8",
    authDomain: "processo-admin.firebaseapp.com",
    projectId: "processo-admin",
    storageBucket: "processo-admin.firebasestorage.app",
    messagingSenderId: "533488858833",
    appId: "1:533488858833:web:5c0e2af22aad626deeb7f0"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

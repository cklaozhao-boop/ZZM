import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, where, doc, getDoc, getDocs, deleteDoc, serverTimestamp, Firestore } from 'firebase/firestore';

// @ts-ignore
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth: Auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider, signInWithPopup, signOut, collection, addDoc, onSnapshot, query, orderBy, where, doc, getDoc, getDocs, deleteDoc, serverTimestamp };

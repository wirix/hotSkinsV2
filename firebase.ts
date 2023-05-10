import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDN07lGFjcBYAmcXZlcD43hrk6jpqHtbtg",
  authDomain: "hotskins-23b4c.firebaseapp.com",
  projectId: "hotskins-23b4c",
  storageBucket: "hotskins-23b4c.appspot.com",
  messagingSenderId: "438463365403",
  appId: "1:438463365403:web:b07b7df54c5db86d4c13be"
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const writeUserData = (user: IProfileData): void => {
  firebase.database().ref(`users/${user.uid}`).set(user)
    .catch(e => {
      if (e instanceof Error) {
        console.log(e.message);
      }
    });
};

export const registerWithEmailAndPassword = async (username: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userData: IProfileData = {
      uid: user.uid,
      username,
      email,
      password,
      balance: 30000,
      luckyChance: 0,
      inventory: [],
    };
    writeUserData(userData);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

export const funSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

export const logout = (): void => {
  signOut(auth);
};

interface IProfileData {
  uid: string;
  username: string;
  email: string;
  password: string;
  balance: number;
  luckyChance: number;
  inventory: [];
}